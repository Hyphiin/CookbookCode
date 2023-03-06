<template>
  <page-view>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back to="/rezepte" label="Rezepte" />
      </template>
    </page-header>
    <page-body>
      <div class="content">
        <div class="content-top q-pa-md">
          <q-img class="" src="../../assets/Pizza.jpg" />
          <h5 class="title">{{ recipe.title }}</h5>
          <div class="flex column">
            <div class="flex items-center q-pb-md">
              <q-chip
                color="secondary"
                square
                icon="people"
                class="chipClass"
                >{{ recipe.servings }}</q-chip
              >
            </div>
            <div class="flex items-center q-pb-md">
              <q-chip
                color="secondary"
                square
                icon="schedule"
                class="chipClass"
                >{{ recipe.prepTime }}</q-chip
              >
            </div>
          </div>
        </div>

        <div class="content-bottom flex column q-pa-md">
          <div class="q-mb-lg">
            <q-item-label header class="text-bold">Zutaten</q-item-label>
            <q-list bordered separator class="rounded-borders text-bold list">
              <q-item
                v-for="ingredient in checkIngredientList"
                clickable
                v-ripple
                :key="ingredient.id"
                @click="ingredient.checked = !ingredient.checked"
              >
                <q-item-section side top>
                  <q-checkbox v-model="ingredient.checked" size="sm" />
                </q-item-section>

                <q-item-section>
                  {{ ingredient.ingredient.number }}
                  {{ ingredient.ingredient.numberType }}
                  {{ ingredient.ingredient.name }}
                </q-item-section>
                <q-separator></q-separator>
              </q-item>
            </q-list>
          </div>

          <div>
            <q-item-label header class="text-bold"
              >Arbeitsschritte</q-item-label
            >
            <q-list bordered separator class="rounded-borders list">
              <q-item v-for="step in checkStepList" :key="step.id">
                <q-item-section side top> {{ step.id }}. </q-item-section>

                <q-item-section>
                  {{ step.step }}
                </q-item-section>
                <q-separator></q-separator>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </page-body>
  </page-view>
</template>

<script setup>
/**
 * imports
 */
import { ref } from "vue";
import { useRoute } from "vue-router";
import PageHeaderBtnBack from "../../components/Page/PageHeaderBtnBack.vue";
import { useStoreRecipes } from "src/stores/storeRecipes";

/**
 * store
 */
const recipeStore = useStoreRecipes();

/**
 * routes
 */
const route = useRoute();
const recipe = recipeStore.recipes.find(
  (recipe) => recipe.id === route.params.id
);

console.log(recipeStore.recipes);
console.log(recipe);

let tempIngredientCounter = 0;

const checkIngredientList = ref([]);

recipe.ingredients.forEach((ingredient) => {
  checkIngredientList.value.push({
    ingredient: ingredient,
    checked: false,
    id: tempIngredientCounter,
  });
  tempIngredientCounter++;
});

let tempStepCounter = 1;

const checkStepList = ref([]);

recipe.prepSteps.forEach((step) => {
  checkStepList.value.push({
    step: step,
    checked: false,
    id: tempStepCounter,
  });
  tempStepCounter++;
});
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 50px;
  .content-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    .q-img {
      min-height: 100px;
      height: 100px;
      max-height: 100px;
    }
  }
  .content-right {
    flex: 1;
    min-height: 70vh;
    margin-left: 50px;

    .q-item__label {
      padding-left: 0px;
      padding-bottom: 24px;
      padding-top: 0px;
    }

    .chipClass {
      .q-icon {
        color: var(--q-primary);
      }
    }
    .list {
      background-color: #faf4f1;
      .q-item {
        &:hover {
          background-color: #ffd7ba;
        }
      }
    }

    @media screen and (min-width: 750px) {
      .title {
        width: 750px;
      }
    }
  }
}
</style>
