<template>
  <q-layout view="hHh lpR fFf">
    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
      >
        <q-route-tab to="/" name="articles" label="Rezepte" icon="menu_book" />
        <q-route-tab
          to="/list"
          name="videos"
          label="Einkaufsliste"
          icon="receipt_long"
        />
        <q-route-tab
          to="/calendar"
          name="images"
          label="Kalender"
          icon="event"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
