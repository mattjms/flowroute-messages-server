<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const BLANK_SECRET = '••••••••••••••••'

const tableRef = ref()
const filter = ref('')
const loading = ref(true)
const edit = ref(false)
const record = ref()

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
  {
    name: 'api_key',
    align: 'left',
    label: 'API Key',
    field: 'api_key',
    sortable: true
  },
  {
    name: 'secret_key',
    align: 'left',
    label: 'Secret Key',
    field: 'secret_key',
    format: _val => BLANK_SECRET,
    sortable: true
  },
  {
    name: 'actions',
    label: 'Action',
    align: 'center',
  },
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

function onBeginEdit(row) {
  record.value = row;
  record.value.secret_key = BLANK_SECRET;
  edit.value = true;
}

function onEditCancel() {
  record.value = undefined;
}

function onEditSave() {
  api.put(record.value.url, record.value)
    .then(() => {
      $q.notify({
        color: 'positive',
        position: 'top',
        message: 'Save Successful',
      })
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Save failed',
      })
    })
}

function onDelete(props) {
  console.log('delete', props);
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
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="bi-pencil" @click="onBeginEdit(props.row)"></q-btn>
          <q-btn icon="bi-trash" @click="onDelete(props.row)"></q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="edit" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">User Detail</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="record.email" label="Email" autofocus />
          <q-input dense v-model="record.api_key" label="API Key" />
          <q-input dense v-model="record.secret_key" label="Secret Key" type="password" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="onEditCancel()"/>
          <q-btn flat label="Save" v-close-popup @click="onEditSave()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<style lang="scss">
</style>