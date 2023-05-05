<template>
  <q-page class="flex flex-center">
    <div class="container">
      <h5 style="margin-top: 30px">{{ t("Signup") }}</h5>
      <q-form
        @submit.prevent="Saveinfo"
        class="q-px-sm"
        style="margin-top: -15px"
      >
        <q-input
          :readonly="loading"
          v-model="model.entity.username"
          filled
          type="username"
          :label="t('Username')"
          style="width: 250px; color: #1a237e"
          :rules="[(val) => !!val || 'Username is required']"
        />

        <q-input
          :readonly="loading"
          v-model="model.entity.email"
          filled
          type="email"
          :label="t('Email')"
          style="width: 250px; color: #1a237e"
          :rules="[(val) => !!val || 'Email is required']"
        />

        <br />
        <q-input
          v-model="model.entity.password"
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
          <p style="display: inline">{{ t("HaveAccount") }}</p>
          <router-link to="/auth/login">&nbsp; {{ t("Click") }}</router-link>
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
import { AuthenApi } from "src/api/AuthenApi";
import { useAuthenStore } from "src/stores/authen";
const { registerUser } = AuthenApi();
const { t, localeList, locale } = useLang();
const $q = useQuasar();

const showPassword = ref(false);
const loading = ref(false);

const model = ref({
  entity: {
    username: "",
    email: "",
    password: "",
    userRoles: ["3"],
  },
});

console.log(model);
const Login = () => {
  router.push("/signin/");
};

// แกะข้อมูลจาก jsondata ด้วยการ loop ผ่าน array ของ errors
// แล้วตรวจสอบค่า field ว่าเป็น "username" หรือ "email"
// แล้วนำ message ไปแสดงผล
const Saveinfo = async () => {
  const data = await registerUser(model.value.entity);
  if (data) {
    if (data.message === null) {
      const errors = data.errors;
      errors.forEach((error) => {
        if (error.field === "username" || error.field === "email") {
          $q.notify({
            message: error.message,
            type: "negative",
          });
        }
      });
    } else {
      $q.notify({
        message: t("RegisSuc"),
        type: "positive",
      });
      setTimeout(() => {
        window.location.replace("/#/auth/login");
      }, 500);
    }
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
  height: 470px;
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
