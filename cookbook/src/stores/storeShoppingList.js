import { defineStore } from "pinia";
import { ref } from "vue";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { db } from "/src/js/firebase";

const shoppingListCollectionRef = collection(db, "Einkaufsliste");
// const recipesCollectionQuery = query(
//   shoppingListCollectionRef,
//   orderBy("date", "desc")
// );

export const useStoreShoppingList = defineStore("Einkaufsliste", () => {
  const shoppingList = ref([]);
  const itemsLoaded = ref(false);

  /**
   * actions
   */
  const getList = async () => {
    itemsLoaded.value = false;
    onSnapshot(shoppingListCollectionRef, (querySnapshot) => {
      const tempList = [];

      querySnapshot.forEach((doc) => {
        let listItem = {
          id: doc.id,
          title: doc.data().title,
          amount: doc.data().amount,
          size: doc.data().size,
          note: doc.data().note,
          done: doc.data().done,
        };
        tempList.push(listItem);
      });
      shoppingList.value = tempList;
      itemsLoaded.value = true;
    });
  };

  const addItem = async (newItemContent) => {
    console.log(newItemContent);
    const data = {
      title: newItemContent.title,
      amount: newItemContent.amount,
      size: newItemContent.size,
      note: newItemContent.note,
      done: newItemContent.done,
    };
    await addDoc(shoppingListCollectionRef, data);
  };

  const setItemDone = async (idToChange, valueToChange) => {
    const batch = writeBatch(db);
    const tempRef = doc(db, "Einkaufsliste", idToChange);
    batch.update(tempRef, { done: valueToChange });

    await batch.commit();
  };

  const editItem = async (idToChange, newItemContent) => {
    const batch = writeBatch(db);
    const tempRef = doc(db, "Einkaufsliste", idToChange);
    batch.update(tempRef, {
      title: newItemContent.title,
      amount: newItemContent.amount,
      size: newItemContent.size,
      note: newItemContent.note,
      done: newItemContent.done,
    });

    await batch.commit();
  };

  /**
   * getters
   */

  return {
    shoppingList,
    itemsLoaded,
    getList,
    addItem,
    setItemDone,
    editItem,
  };
});
