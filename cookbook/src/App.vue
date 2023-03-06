<template>
  <router-view />
</template>

<script setup>
/**
 * imports
 */
import { useStoreRecipes } from "src/stores/storeRecipes";
import { onMounted } from "vue";

/**
 * store
 */
const recipeStore = useStoreRecipes();

onMounted(() => {
  recipeStore.getRecipes();
});
</script>
