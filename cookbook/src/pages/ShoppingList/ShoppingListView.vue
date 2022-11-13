<template>
  <page-view>
    <page-header>
      <template #title>Einkaufsliste</template>
    </page-header>
    <page-body>
      <div class="row q-pa-sm bg-primary">
        <q-input
          class="col-7 q-pr-sm"
          filled
          bg-color="white"
          v-model="inputText"
          placeholder="Hinzufügen"
          dense
        />
        <q-input
          class="col-2 q-pr-sm"
          filled
          number
          bg-color="white"
          v-model="inputNumber"
          placeholder="0"
          dense
        />
        <q-select
          class="col-2 q-pr-sm"
          filled
          dense
          bg-color="white"
          v-model="selectSize"
          :options="sizeOptions"
          label="g"
        />
        <q-btn
          dense
          color="white"
          text-color="grey-8"
          class="col-1"
          icon="add"
        />
      </div>
      <q-list class="bg-white" separator bordered>
        <q-item
          v-for="(item, idx) in shoppingList"
          :key="idx"
          :class="{ 'done bg-orange-1': item.done }"
          @click="changeList(item, idx)"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="fastfood" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
          <q-separator vertical inset />
          <q-item-section
            v-if="!item.done"
            side
            @click.stop="editItem(item, idx)"
          >
            <q-btn flat icon="edit" size="md" />
          </q-item-section>
        </q-item>
      </q-list>
      <div class="column justify-end q-pa-xs" style="min-height: 100px">
        <q-label>Eingekauft:</q-label>
      </div>
      <q-list class="bg-white" separator bordered>
        <q-item
          v-for="(item, idx) in deletedList"
          :key="idx"
          :class="{ 'done bg-orange-1': item.done }"
          @click="changeList(item, idx)"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="fastfood" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="!item.done" side>
            <q-btn flat round dense color="primary" icon="edit" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="secondary" />
      </q-page-sticky>
    </page-body>
  </page-view>
</template>

<script setup>
import { ref } from "vue";

/**
 * list
 */
const inputText = ref("");
const inputNumber = ref(0);
const selectSize = ref("");

const sizeOptions = ["g", "ml", "l", "kg", "Pkg", "Stk"];

const shoppingList = ref([
  {
    title: "Bananen",
    amount: "5 Stk",
    note: "",
    done: false,
  },
  {
    title: "Klopapier",
    amount: "1 Pkg",
    note: "4 lagig",
    done: false,
  },
  {
    title: "Joghurt",
    amount: "500g",
    note: "",
    done: false,
  },
]);

const deletedList = ref([]);

const changeList = (item, idx) => {
  item.done = !item.done;
  if (item.done) {
    deletedList.value.push(item);
    shoppingList.value.splice(idx, 1);
  } else {
    shoppingList.value.push(item);
    deletedList.value.splice(idx, 1);
  }
};

const editItem = (item, idx) => {
  console.log(item, idx);
};
</script>
