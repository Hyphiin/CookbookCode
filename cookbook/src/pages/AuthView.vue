<template>
  <page-view>
    <page-header>
      <template #title>Login</template>
    </page-header>
    <page-body>
      <div class="tabs q-my-xl">
        <q-tabs v-model="tabActive" class="text-teal">
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Registeren" />
        </q-tabs>
      </div>
      <q-card bordered class="login-card">
        <q-card-section>
          <div class="text-h6 text-center">{{ formTitle }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="credentials.email"
              label="Email"
              hint=""
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Bitte fülle das Feld aus',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="credentials.password"
              label="Passwort"
              hint=""
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Bitte fülle das Feld aus',
              ]"
            />

            <div>
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
                @click="onSubmit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </page-body>
  </page-view>
</template>

<script setup>
/**
 * imports
 */

import { ref, computed, reactive } from "vue";

/**
 * register / login
 */

const tabActive = ref("login");

/**
 * title
 */

const formTitle = computed(() => {
  return tabActive.value === "login" ? "Login" : "Registrieren";
});

/**
 * credentials
 */

const credentials = reactive({
  email: "",
  password: "",
});

/**
 * submit
 */

const onSubmit = () => {
  console.log("yay");
  if (!credentials.email || !credentials.password) {
    alert("Bitte fülle beide Felder aus!");
  } else {
    if (tabActive.value === "register") {
      console.log("register user with:", credentials);
    } else {
      console.log("login user with:", credentials);
    }
  }
};
</script>

<style>
.login-card {
  max-width: 400px;
  text-align: right;
  margin: 0px auto;
  width: 300px;
}
</style>
