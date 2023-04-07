<template>
  <q-page class="flex flex-center">
    <div class="container">
      <q-form @submit="onSubmit">
        <!-- หัวข้อ Edit Profile -->
        <p
          style="
            font-size: 25px;
            font-weight: bolder;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
            color: #1a237e;
          "
        >
          ✧･ﾟ {{ t("EditUser") }} ｡･✧
        </p>

        <br />
        <!-- ส่วนของการเปลี่ยนอีเมล -->
        <q-spinner v-if="loading == true" color="primary" size="3em" />
        <template v-else>
          <q-card-section v-if="entityItem">
            <i style="color: #5c6bc0">{{ t("Email") }} :</i>
            <q-input
              filled
              v-model="entityItem.email"
              :dense="dense"
              style="max-width: 300px; margin-bottom: -20px"
          /></q-card-section>

          <!-- ส่วนของการแก้ไข Username -->
          <q-card-section v-if="entityItem">
            <i style="color: #5c6bc0">{{ t("Username") }} :</i>
            <q-input
              filled
              v-model="entityItem.username"
              :dense="dense"
              style="max-width: 300px; margin-top: "
          /></q-card-section>

          <!-- ปุ่ม toggle เปิด-ปิดสถานะผู้ใช้งาน -->
          <i style="color: #5c6bc0; margin-left: 15px">{{ t("UserStatus") }}</i>
          <br />
          <q-toggle
            v-model="fourth"
            checked-icon="check"
            color="red"
            label=" Status"
            unchecked-icon="clear"
          />

          <!-- ส่วนของปุ่ม Submit -->
          <q-btn
            type="submit"
            glossy
            push
            color="indigo-10"
            style="margin-top: -20px; margin-left: 80px"
            >{{ $t("okay") }}</q-btn
          >
          <!-- ส่วนของปุ่มยกเลิก -->
          <q-btn
            to="/admanageuser"
            glossy
            push
            color="indigo-10"
            style="margin-top: -20px; margin-left: 10px"
            >{{ $t("cancel") }}</q-btn
          >
        </template>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useMeta, useQuasar } from "quasar";
import { useLang } from "src/composables/useLang";
import { UserApi } from "src/api/UserApi";
import { useRoute, useRouter } from "vue-router";
import { biArrowLeft } from "@quasar/extras/bootstrap-icons";
const route = useRoute();
const { t } = useLang();
useMeta({ title: "Edit User" });

const router = useRouter();
const $q = useQuasar();
const action = ref();
const { getUserList, getOne, updateUser } = UserApi();
const value = ref(true);
const userId = ref();
const entityItem = ref();
const loading = ref(false);

onMounted(() => {
  onSubmit();
  if (route.params.userId) {
    userId.value = route.params.userId;
  }
  if (route.params.action) {
    action.value = route.params.action;
  }
  // บังคับให้ action เป็น edit ถึงจะให้เข้ามาแก้ไข
  if (userId.value && action.value == "edit") {
    fethData();
  }
  console.log("get userId ", userId.value);
});

const fethData = async () => {
  loading.value = true;
  const respone = await getOne(userId.value);
  loading.value = false;
  console.log("fethData", respone);
  if (respone) {
    entityItem.value = respone.entity;
  }
};

const onSubmit = async () => {
  console.log("onSubmit", entityItem.value);
  if (action.value == "edit") {
    updateProcess();
  } else {
    createProcess();
  }
};
const updateProcess = async () => {
  loading.value = true;
  const response = await updateUser(entityItem.value);
  console.log("updateUser", response);
  if (response) {
    $q.notify({
      message: response.message,
      type: "positive",
    });
  }
  loading.value = false;
  router.push("/admanageuser");
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
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 50px 25px 50px;
  background: white;
}
</style>
