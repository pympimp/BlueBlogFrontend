<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- หัวข้อ Edit Profile -->
      <p style="font-size: 25px; font-weight: bolder; color: #880e4f">
        {{ t("Setting") }}
      </p>
      <q-spinner v-if="loading == true" color="primary" size="3em" />
      <template v-else>
        <form @submit.prevent="onSubmit">
          <!-- ส่วนของการแก้ไข password เก่า-->
          <div style="display: flex; align-items: center">
            <i style="margin-right: 10px; color: #3949ab"
              >{{ t("OldPassword") }} :</i
            >
            <q-input
              v-model="entityItem.oldPassword"
              filled
              :type="isPwd ? 'password' : 'text'"
              style="width: 300px"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <!-- ส่วนของการแก้ไข password ใหม่-->
          <div style="display: flex; align-items: center" class="q-mt-md">
            <i style="margin-right: 10px; color: #3949ab"
              >{{ t("NewPassword") }} :</i
            >
            <q-input
              v-model="entityItem._p"
              filled
              :type="isPwd ? 'password' : 'text'"
              style="width: 300px"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <!-- ส่วนของปุ่ม Submit -->
          <div style="display: flex; justify-content: center; margin-top: 20px">
            <q-btn glossy push color="pink" :label="t('Save')" type="submit" />
          </div>
        </form>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { UserApi } from "src/api/UserApi";
import { AuthenApi } from "src/api/AuthenApi";
import { useQuasar } from "quasar";

const { loginProcess } = AuthenApi();
const { userChangePwd } = UserApi();
const { localeList, t, locale } = useLang();

const isPwd = ref(true);
const loading = ref(false);
const $q = useQuasar();

const entityItem = ref({
  oldPassword: "",
  _p: "",
  logoutAll: "false",
});

const onSubmit = () => {
  console.log("onSubmit", entityItem.value);
  if (entityItem.value) {
    updateProcess();
    console.log("changepass", entityItem.value);
  } else {
    console.log(response.message);
  }
};

const updateProcess = async () => {
  loading.value = true;
  const response = await userChangePwd(entityItem.value);
  // console.log("userChangePwd ", response);
  if (response.status === true) {
    $q.notify({
      message: response.message,
      type: "positive",
    });
    window.location.replace("/");
  } else {
    $q.notify({
      message: response.message,
      type: "negative",
    });
  }
  loading.value = false;
};
</script>

<style scoped>
.flex {
  background-color: #d6e3ea;
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
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 30px 25px 30px;
  background: white;
}
</style>
