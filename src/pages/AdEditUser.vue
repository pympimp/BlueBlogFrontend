<template>
  <q-page class="flex flex-center">
    <div class="container">
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
            style="width: 300px; margin-bottom: 7px"
        /></q-card-section>

        <!-- ส่วนของการแก้ไข password -->
        <i style="color: #5c6bc0; margin-left: 15px">{{ t("Password") }} :</i>
        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          style="width: 300px; margin-bottom: 20px; margin-left: 15px"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <!-- ปุ่ม toggle เปิด-ปิดสถานะผู้ใช้งาน -->
        <i style="color: #5c6bc0; margin-left: 15px">{{ t("UserStatus") }}</i>
        <br />
        <q-toggle
          v-model="third"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
        />

        <!-- ส่วนของปุ่ม Submit -->
        <q-btn
          type="submit"
          glossy
          push
          color="indigo-10"
          style="margin-top: -20px; margin-left: 100px"
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
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useMeta } from "quasar";
import { useLang } from "src/composables/useLang";
import { UserApi } from "src/api/UserApi";
import { useRoute } from "vue-router";
const route = useRoute();
const { t } = useLang();
const { getOne } = UserApi();
useMeta({ title: "Edit User" });

const value = ref(true);
const userId = ref();
const entityItem = ref();
const loading = ref(false);
onMounted(() => {
  if (route.params.userId) {
    userId.value = route.params.userId;
  }

  if (userId.value) {
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
const onSubmit = () => {
  console.log("onSubmit", entityItem.value);
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
