<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลหลักของผู้ใช้ -->
    <div class="container-header">
      <!-- ส่วนของรูปโปรไฟล์ -->
      <ion-avatar class="profile" style="display: inline">
        <img
          src="/public/profile-icon.png"
          style="width: 70px; height: 70px; margin-right: 15px; margin-top: 5px"
        />
      </ion-avatar>

      <!-- ส่วนของ username และ bio -->
      <div class="details" style="margin-top: 10px; margin-right: 10px">
        <b style="color: #1a237e"> Admin00001</b>
        <p style="color: #5c6bc0; margin-left: 10px">
          " ขออนุญาตประกาศเปิดใช้เว็บไซต์ Version Meta ในวันที่ 28 เมษายน 2566"
        </p>
      </div>

      <!-- ส่วนของปุ่มแก้ไข -->
      <q-btn
        to="manageprofile"
        glossy
        push
        color="pink"
        :label="t('edit')"
        style="height: 20px"
      />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

const { localeList, t, locale } = useLang();
</script>

<style scoped>
.flex {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: 100%;
  height: auto;
}
.container-header {
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  width: 500px;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 20px 20px 20px 20px;
  background: white;
}

.container-content {
  opacity: 0.8;
  width: 700px;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

/* set up รูปโปรไฟล์ */
</style>
