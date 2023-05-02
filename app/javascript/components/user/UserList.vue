<script setup>
import { reactive, ref, onMounted } from 'vue'
import { api } from '../../boot/axios'
import { useQuasar } from 'quasar'
import { UserModel, UserStore } from '../../data/User'

const $q = useQuasar()
const BLANK_SECRET = '••••••••••••••••'

const tableRef = ref()
const filter = ref('')
const loading = ref(true)
const edit = ref(false)
const record = ref()
const store = reactive(new UserStore())

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
  sortBy: 'email',
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0
})

function onRequest (props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter
  const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

  loading.value = true
  store.clear();
  store.page(page).fetch({ params: {
    page: page,
    page_size: rowsPerPage,
    sort_by: sortBy,
    descending: descending,
  }})
    .then(function(response) {
      pagination.value.rowsNumber = store.getTotal()
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending

      loading.value = false
    });
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
      :rows="store.models"
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