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
          v-model="currentName"
          placeholder="Hinzufügen"
          dense
          @keydown.enter.prevent="addItem"
        />
        <q-input
          class="col-2 q-pr-sm"
          filled
          number
          bg-color="white"
          v-model="currentNumber"
          placeholder=""
          dense
          @keydown.enter.prevent="addItem"
        />
        <q-select
          class="col-2 q-pr-sm"
          filled
          dense
          bg-color="white"
          v-model="currentSize"
          :options="sizeOptions"
          placeholder=""
          @keydown.enter.prevent="addItem"
        />
        <q-btn
          dense
          color="white"
          text-color="grey-8"
          class="col-1"
          icon="add"
          @click="addItem"
        />
      </div>
      <q-list class="bg-white" separator bordered>
        <q-item
          v-for="(item, idx) in shoppingList"
          :key="idx"
          :class="{ 'done bg-orange-1': item.done }"
          clickable
          v-ripple
          @click="changeList(item)"
        >
          <q-item-section avatar>
            <q-icon name="fastfood" color="primary" />
          </q-item-section>
          <q-item-section>
            <div class="item__details">
              <div class="details__core">
                <q-item-label>{{ item.title }}</q-item-label>
                <q-item-label class="small-label">{{ item.note }}</q-item-label>
              </div>
              <div class="details__size">
                <q-item-label>{{ item.amount }} {{ item.size }}</q-item-label>
              </div>
            </div>
          </q-item-section>
          <q-separator vertical inset />
          <q-item-section v-if="!item.done" side @click.stop="editItem(item)">
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
          :class="{ 'done bg-green-1': item.done }"
          clickable
          v-ripple
          @click="changeList(item, idx)"
        >
          <q-item-section avatar>
            <q-icon name="fastfood" color="primary" />
          </q-item-section>
          <q-item-section>
            <div class="item__details">
              <div class="details__core">
                <q-item-label>{{ item.title }}</q-item-label>
                <q-item-label class="small-label">{{ item.note }}</q-item-label>
              </div>
              <div class="details__size">
                <q-item-label>{{ item.amount }} {{ item.size }}</q-item-label>
              </div>
            </div>
          </q-item-section>
          <q-separator vertical inset />
          <q-item-section
            v-if="!item.done"
            side
            @click.stop="editItemFunction(item, idx)"
          >
            <q-btn flat icon="edit" size="md" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="secondary" />
      </q-page-sticky>
      <q-dialog v-model="editItem" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Your address</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="address"
              autofocus
              @keyup.enter="editItem = false"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add address" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </page-body>
  </page-view>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreShoppingList } from "src/stores/storeShoppingList";
/**
 * store
 */
const shoppingListStore = useStoreShoppingList();

onMounted(() => {
  shoppingListStore.getList();
});

watch(
  () => shoppingListStore.shoppingList,
  (newValue) => {
    shoppingList.value = [];
    deletedList.value = [];
    newValue.forEach((item) => {
      console.log(item);
      if (item.done === true) {
        deletedList.value.unshift(item);
      } else {
        shoppingList.value.push(item);
      }
    });
  }
);

/**
 * list
 */
const currentName = ref("");
const currentNumber = ref(null);
const currentSize = ref(null);

const sizeOptions = ["g", "kg", "ml", "l", , "Pkg", "Stk"];

const shoppingList = ref([]);
const deletedList = ref([]);

const changeList = (item) => {
  shoppingListStore.setItemDone(item.id, !item.done);
};

const editItem = ref(false);
const editItemFunction = (item, idx) => {
  editItem.value = true;
  console.log(item, idx);
};

const addItem = () => {
  if (currentName.value !== "") {
    if (currentName.value.includes(" ")) {
      let tempName = [];
      tempName = currentName.value.split(" ");
      let notesString = "";
      for (let i = 1; i < tempName.length; i++) {
        notesString += tempName[i];
      }
      shoppingListStore.addItem({
        title: tempName[0],
        amount: parseInt(currentNumber.value),
        size: currentSize.value,
        note: notesString,
        done: false,
      });
    } else {
      shoppingListStore.addItem({
        title: currentName.value,
        amount: parseInt(currentNumber.value),
        size: currentSize.value,
        note: "",
        done: false,
      });
    }
  }
  currentName.value = "";
  currentNumber.value = null;
  currentSize.value = "";
};
</script>
