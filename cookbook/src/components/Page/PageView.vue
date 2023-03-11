<template>
  <div class="page absolute-top fit bg-white shadow-4 bg-grey-4">
    <div class="page-nudger fit">
      <div :class="hasActiveChildPage === true ? 'nudge-left' : 'none'">
        <slot />
      </div>

      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { onActivated, onDeactivated, ref, watch } from "vue";

//nudge left class
const hasActiveChildPage = ref(false);

onActivated(() => {
  hasActiveChildPage.value = true;
});

onDeactivated(() => {
  hasActiveChildPage.value = false;
});
</script>
