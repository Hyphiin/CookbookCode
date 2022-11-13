<template>
  <page-view>
    <page-header>
      <template v-slot:title>Rezepte</template>
    </page-header>
    <page-body>
      <div class="recipes-body q-pa-md">
        <div v-for="recipe of recipesArray" :key="recipe.name">
          <q-card class="recipe-card">
            <router-link :to="'/rezepte/info'">
              <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg">
                <div class="text-h6 absolute-bottom text-center">
                  {{ recipe.name }}
                </div>
              </q-img>
            </router-link>

            <q-card-section>
              <div class="row no-wrap">
                <div class="col text-grey ellipsis">
                  <q-rating v-model="ratingModel" size="1.5em" readonly />
                  <q-icon name="hourglass_top" />
                  {{ recipe.time }}
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
              <router-link :to="'/rezepte/info'">
                <q-btn size="sm" round icon="menu_book" color="primary" />
              </router-link>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </page-body>
  </page-view>
</template>

<script setup>
import { ref } from "vue";

const recipesArray = ref([
  { id: 1, name: "Spaghetti Carbonara", time: "30min" },
  { id: 2, name: "Käsebrot", time: "5min" },
]);
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
