<script setup>
import { ref } from 'vue'
import UserList from './user/UserList.vue'

const tab = ref('users')
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white g-0">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <i class="bi-telephone-fill"></i>
          </q-avatar>
          Flowroute Messaging
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="users" label="Users" />
          <q-tab name="messages" label="Messages" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="users">
            <UserList></UserList>
          </q-tab-panel>

          <q-tab-panel name="messages">
            <div class="text-h6">Messages</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss">
.q-toolbar {
  .q-avatar {
    font-size: 3rem;
    margin-left: var(--bs-gutter-x);
  }
}
</style>