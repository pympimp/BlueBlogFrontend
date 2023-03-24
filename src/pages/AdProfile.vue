<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลหลักของผู้ใช้ -->
    <div class="container-header">
      <!-- รูปโปรไฟล์ -->

      <ion-avatar class="profile" style="display: inline">
        <img src="/public/pf1.png" style="width: 70px; height: 70px" />
      </ion-avatar>
      <!-- username และ bio -->
      <div class="details" style="display: inline; margin-top: 10px">
        <b> Username00009</b>
        <p>" โย่ว"</p>
      </div>
      <q-btn
        to="manageprofile"
        glossy
        push
        color="pink"
        label="แก้ไขโปรไฟล์"
        style="height: 20px; margin-top: 150px; margin-right: 170px"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default {
  name: "MyProfile ",
  setup() {
    return {};
  },
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
