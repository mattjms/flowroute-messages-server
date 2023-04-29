import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: '' })

api.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
