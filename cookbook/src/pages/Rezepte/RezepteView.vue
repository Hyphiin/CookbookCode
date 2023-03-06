<template>
  <page-view>
    <page-header>
      <template v-slot:title>Rezepte</template>
    </page-header>
    <page-body>
      <div class="recipes-body q-pa-md">
        <div v-for="recipe of recipeStore.recipes" :key="recipe.title">
          <q-card class="recipe-card">
            <router-link :to="`/rezepteDetail/${recipe.id}`">
              <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg">
                <div class="text-h6 absolute-bottom text-center">
                  {{ recipe.title }}
                </div>
              </q-img>
            </router-link>

            <q-card-section>
              <div class="row no-wrap">
                <div class="col text-grey ellipsis flex justify-between">
                  <q-rating v-model="ratingModel" size="1.2em" readonly />
                  <div>
                    <q-icon name="hourglass_top" />
                    {{ recipe.prepTime }} min
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions class="flex" :align="'right'">
              <q-btn size="sm" flat icon="event" round>
                <q-popup-proxy
                  @before-show="updateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="proxyDate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        label="Cancel"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        @click="save"
                        v-close-popup
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
              <q-btn size="sm" flat round icon="receipt_long" class="q-mr-sm" />
              <router-link :to="`/rezepteDetail/${recipe.id}`">
                <q-btn size="sm" round icon="menu_book" color="primary" />
              </router-link>
            </q-card-actions>
          </q-card>
        </div>
        <router-link :to="`/addRezept`">
          <q-btn size="lg" round icon="add" color="primary" />
        </router-link>
      </div>
    </page-body>
  </page-view>
</template>

<script setup>
import { useStoreRecipes } from "src/stores/storeRecipes";
import { ref, onMounted } from "vue";

/**
 * store
 */
const recipeStore = useStoreRecipes();

const date = ref("2019/03/01");
const proxyDate = ref("2019/03/01");

let ratingModel = ref(3);

const updateProxy = () => {
  proxyDate.value = date.value;
};

const save = () => {
  date.value = proxyDate.value;
};
</script>
