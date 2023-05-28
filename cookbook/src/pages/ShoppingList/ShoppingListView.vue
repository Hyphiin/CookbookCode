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
          label="Name"
          dense
          @keydown.enter.prevent="addItem"
        />
        <q-input
          class="col-2 q-pr-sm"
          filled
          number
          bg-color="white"
          v-model="currentNumber"
          label="Anzahl"
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
          label="Einheit"
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
          <q-item-section v-if="!item.done" side @click.stop="editItem = true">
            <q-btn flat icon="edit" size="md" @click="editItemFunction(item)" />
          </q-item-section>
        </q-item>
      </q-list>
      <div
        v-if="shoppingList.length === 0"
        class="flex justify-center q-mt-lg text-grey-6"
      >
        Noch keine Produkte vorhanden...
      </div>
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
        </q-item>
      </q-list>
      <div
        v-if="deletedList.length === 0"
        class="flex justify-center q-mt-lg text-grey-6"
      >
        Noch keine Produkte eingekauft...
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="secondary" @click="addItemDialog = true" />
      </q-page-sticky>
      <q-dialog v-model="editItem" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Eintrag bearbeiten</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              class="col-7 q-pr-sm"
              filled
              bg-color="white"
              v-model="currentEditName"
              placeholder="Hinzufügen"
              dense
              @keydown.enter.prevent="editItemFunction"
            />
            <q-input
              class="col-7 q-pr-sm"
              filled
              bg-color="white"
              v-model="currentEditNote"
              label="Notiz"
              dense
              @keydown.enter.prevent="editItemFunction"
            />
            <q-input
              class="col-2 q-pr-sm"
              filled
              number
              bg-color="white"
              v-model="currentEditNumber"
              placeholder=""
              dense
              @keydown.enter.prevent="editItemFunction"
            />
            <q-select
              class="col-2 q-pr-sm"
              filled
              dense
              bg-color="white"
              v-model="currentEditSize"
              :options="sizeOptions"
              placeholder=""
              @keydown.enter.prevent="editItemFunction"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Abbrechen" v-close-popup />
            <q-btn
              flat
              label="Speichern"
              v-close-popup
              @click="editItemFunction()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="addItemDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Eintrag hinzufügen</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              class="col-7 q-pr-sm"
              filled
              bg-color="white"
              v-model="currentName"
              label="Name"
              dense
              @keydown.enter.prevent="addItem"
            />
            <q-input
              class="col-7 q-pr-sm"
              filled
              bg-color="white"
              v-model="currentNote"
              label="Notiz"
              dense
              @keydown.enter.prevent="addItem"
            />
            <q-input
              class="col-2 q-pr-sm"
              filled
              number
              bg-color="white"
              v-model="currentNumber"
              label="Anzahl"
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
              label="Einheit"
              @keydown.enter.prevent="addItem"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Abbrechen" v-close-popup />
            <q-btn flat label="Speichern" v-close-popup @click="addItem" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </page-body>
  </page-view>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreShoppingList } from "src/stores/storeShoppingList";
import { Loading } from "quasar";
/**
 * store
 */
Loading.show({
  message: "Items are Loading. Hang on...",
});

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

watch(
  () => shoppingListStore.itemsLoaded,
  (newValue) => {
    if (newValue === true) {
      Loading.hide();
    }
  }
);

/**
 * list
 */
const sizeOptions = ["g", "kg", "ml", "l", , "Pkg", "Stk"];

const shoppingList = ref([]);
const deletedList = ref([]);

const changeList = (item) => {
  shoppingListStore.setItemDone(item.id, !item.done);
};

const currentName = ref("");
const currentNumber = ref(null);
const currentSize = ref(null);
const currentNote = ref("");

const addItemDialog = ref(false);
const addItem = () => {
  if (currentName.value !== "") {
    if (currentNote.value === "") {
      if (currentName.value.includes(" ")) {
        let tempName = [];
        tempName = currentName.value.split(" ");
        let notesString = "";
        for (let i = 1; i < tempName.length; i++) {
          notesString += tempName[i] + " ";
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
    } else {
      shoppingListStore.addItem({
        title: currentName.value,
        amount: parseInt(currentNumber.value),
        size: currentSize.value,
        note: currentNote.value,
        done: false,
      });
    }
  }
  currentName.value = "";
  currentNumber.value = null;
  currentSize.value = "";
  currentNote.value = "";
};

const editItem = ref(false);
const currentEditItemId = ref(null);

const currentEditName = ref("");
const currentEditNumber = ref(null);
const currentEditSize = ref(null);
const currentEditNote = ref("");

const editItemFunction = (item) => {
  console.log(item);
  if (item !== undefined) {
    editItem.value = true;
    currentEditItemId.value = item.id;
    currentEditName.value = item.title;
    currentEditNumber.value = item.amount;
    currentEditSize.value = item.size;
    currentEditNote.value = item.note;
  } else {
    shoppingListStore.editItem(currentEditItemId.value, {
      title: currentEditName.value,
      amount: parseInt(currentEditNumber.value),
      size: currentEditSize.value,
      note: currentEditNote.value,
      done: false,
    });
    editItem.value = false;
  }
};
</script>
