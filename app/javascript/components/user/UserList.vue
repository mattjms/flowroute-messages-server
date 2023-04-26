<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const tableRef = ref()
const filter = ref('')
const loading = ref(true)

const columns = ref([
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'api_key', align: 'left', label: 'API Key', field: 'api_key', sortable: true },
  { name: 'secret_key', align: 'left', label: 'Secret Key', field: 'secret_key', sortable: true },
])

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10
})

const rows = ref([])

function onRequest (props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter
  const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

  loading.value = true

  api.get('/users.json')
    .then((response) => {
      console.log(response)
      pagination.value.rowsNumber = response.data.total

      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...response.data.results)

      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending

      // ...and turn of loading indicator
      loading.value = false
     })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Loading failed',
      })
    })
}


onMounted(() => {
  tableRef.value.requestServerInteraction()
})

</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      row-key="email"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
    />
  </div>
</template>

<style lang="scss">
</style>