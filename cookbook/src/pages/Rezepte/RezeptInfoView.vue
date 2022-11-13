<template>
  <page-view>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back to="/rezepte" label="Rezepte" />
      </template>
    </page-header>
    <page-body>
      <div class="q-pa-md">
        <p v-for="i in 20" :key="i">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          perspiciatis quasi fugit in nulla suscipit veniam, harum culpa quos,
          qui tempora, ea optio ut sunt enim distinctio quaerat dolorem ullam.
        </p>
      </div>
    </page-body>
  </page-view>
</template>

<script setup>
import PageHeaderBtnBack from "../../components/Page/PageHeaderBtnBack.vue";
</script>
