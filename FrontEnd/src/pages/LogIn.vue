<template>
  <q-page class="flex flex-center">
    <div class="container">
      <h5 style="margin-top: 30px">{{ t("Login") }}</h5>
      <q-form @submit="onSubmit" class="q-px-sm" style="margin-top: -15px">
        <q-input
          :readonly="loading"
          v-model="email"
          filled
          type="email"
          :label="t('Email')"
          style="width: 250px; color: #1a237e"
          :rules="[(val) => !!val || 'Email is required']"
        />
        <br />
        <q-input
          v-model="password"
          :readonly="loading"
          filled
          :type="showPassword ? 'text' : 'password'"
          :label="t('Password')"
          style="width: 250px; margin-top: -20px"
          :rules="[(val) => !!val || 'Password is required']"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? biEye : biEyeSlash"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <br />
        <section style="margin-top: -5px; margin-bottom: 10px">
          <p style="display: inline">{{ t("NoAccount") }}</p>
          <router-link to="/auth/signup">&nbsp; {{ t("Click") }}</router-link>
        </section>

        <q-card-actions>
          <q-btn
            unelevated
            :loading="loading"
            size="lg"
            color="indigo-6"
            class="full-width text-white"
            :label="t('Submit')"
            type="submit"
            style="border-radius: 20px; text-size: 2px"
          />
        </q-card-actions>
      </q-form>

      <q-card-section class="q-mt-lg text-center">
        <div :class="$q.dark.isActive ? 'text-indigo-1' : 'text-indigo-1'">
          {{ `@ 2023 ${t("appName")}` }}
        </div>
      </q-card-section>

      <q-inner-loading :showing="loading" label="Please wait..." />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMeta, useQuasar } from "quasar";
import { useLang } from "src/composables/useLang";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { AuthenApi } from "src/api/AuthenApi";
import { useAuthenStore } from "src/stores/authen";

const authenStore = useAuthenStore();
const { loginProcess } = AuthenApi();
const { t, localeList, locale } = useLang();

const $q = useQuasar();
useMeta({ title: "Login Page" });

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
  const response = await loginProcess({
    _u: email.value,
    _p: password.value,
  });
  console.log("loginProcess", response);
  loading.value = false;

  // if logined success
  if (response && response.userData && response.userData.apiKey) {
    authenStore.setAuthen(response.userData);
    $q.notify({
      message: "Login Success!",
      avatar: response.userData.picture.path,
    });
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
  } else {
    $q.notify({
      message: t("errorLogin"),
    });
  }
};
</script>

<style scoped>
.flex {
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: 100%;
  height: auto;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  width: 350px;
  height: 390px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

a {
  color: indigo;
  text-decoration: none;
}
</style>
