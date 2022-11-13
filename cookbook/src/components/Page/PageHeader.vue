<template>
  <header
    class="page-header q-header q-layout__section--marginal fixed-top q-header--elevated absolute-top bg-primary text-white"
  >
    <div class="q-toolbar row no-wrap items-center">
      <slot name="buttons-left" />

      <div
        class="page-header-title q-toolbar__title ellipsis text-weight-bold q-pl-none"
      >
        <slot name="title" />
      </div>
    </div>
  </header>
</template>

<script setup></script>
