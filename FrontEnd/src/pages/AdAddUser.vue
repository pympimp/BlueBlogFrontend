<template>
  <q-page class="window row justify-center items-center">
    <q-form @submit="onSubmit">
      <div class="container">
        <!-- หัวข้อ Edit Profile -->
        <p
          style="
            font-size: 25px;
            font-weight: bolder;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
            color: #880e4f;
          "
        >
          ✧･ﾟ {{ t("AddUser") }} ｡･✧
        </p>
        <br />

        <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

        <!-- ส่วนของการเปลี่ยน Username -->
        <i style="color: #c51162">{{ t("Username") }} :</i>
        <q-input
          filled
          v-model="entityItem.username"
          style="width: 300px; margin-bottom: 7px"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

        <!-- ส่วนของการเปลี่ยน Email -->
        <i style="color: #c51162">{{ t("Email") }} :</i>
        <q-input
          filled
          v-model="entityItem.email"
          style="width: 300px; margin-bottom: 7px"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

        <!-- ส่วนของการแก้ไข Password -->
        <i style="color: #c51162">{{ t("Password") }} :</i>
        <q-input
          v-model="entityItem.password"
          filled
          :type="isPwd ? 'password' : 'text'"
          style="width: 300px; color: #c51162"
          :rules="[(val) => !!val || 'Field is required']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
              style="color: #c51162"
            />
          </template>
        </q-input>

        <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

        <!-- ส่วนของปุ่ม Submit -->
        <q-btn
          type="submit"
          glossy
          push
          color="pink-10"
          style="margin-top: 20px; margin-left: 150px"
          >{{ $t("okay") }}</q-btn
        >

        <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

        <!-- ส่วนของปุ่ม Cencal -->
        <q-btn
          to="/admanageuser"
          glossy
          push
          color="pink-10"
          style="margin-top: 20px; margin-left: 10px"
          >{{ $t("cancel") }}</q-btn
        >
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useLang } from "src/composables/useLang";
import { UserApi } from "src/api/UserApi";

const { localeList, t, locale } = useLang();
const { createUser } = UserApi();
const $q = useQuasar();

const action = ref();
const email = ref("");
const password = ref("");
const username = ref("");
const isPwd = ref(true);

// สร้างตัวแปร รอเก็บค่าต่างๆที่ Admin ป้อนเข้ามา
const entityItem = ref({
  id: null,
  username: "",
  email: "",
  password: "",
});

// ฟังก์ชั่นปุ่ม Submit
const onSubmit = async () => {
  console.log("onSubmit", entityItem.value);
  createProcess();
};

// ฟังก์ชั่น Add User
const createProcess = async () => {
  const response = await createUser(entityItem.value);
  // console.log("createUser", response);
  if (response) {
    $q.notify({
      message: response.message,
      type: "positive",
    });
  }
  window.location.replace("/#/admanageuser");
};
</script>
<style scoped>
.window {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: 100%;
  height: auto;
}

.container {
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 50px 25px 50px;
  background: white;
}
</style>
