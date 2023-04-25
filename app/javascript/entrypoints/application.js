console.log('Vite ⚡️ Rails')
console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo-rails'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

import "bootstrap/dist/css/bootstrap.css";

import { createApp } from 'vue'
import App from '../components/App.vue'

const app = createApp(App)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js";
