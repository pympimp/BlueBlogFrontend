<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div class="container">
      <!-- ส่วนของหัวข้อ  'จัดการรายชื่อผู้ใช้งาน (Manage User)' -->
      <p
        style="
          font-size: 25px;
          font-weight: bolder;
          margin-bottom: -10px;
          position: static;
        "
      >
        จัดการรายชื่อผู้ใช้งาน
      </p>
      <!-- ส่วนของเสิร์ชบาร์ -->
      <q-input
        v-model="search"
        filled
        dense
        type="search"
        style="width: 250px; position: relative; left: 380px; top: 40px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- ส่วนของปุ่มเพิ่มผู้ใช้งาน (Add) -->
      <q-btn
        to="adadduser"
        glossy
        color="purple"
        label="Add User"
        style="bottom: -3px; left: 645px"
      />

      <!-- เส้นขีด -->
      <hr
        style="
          border: 0.6px thin gray;
          margin: 15px 15px 15px 15px;
          width: 720px;
        "
      />

      <!-- ส่วนของหัวข้ออย่างเช่น ID Username etc. -->
      <div
        style="
          display: flex;
          justify-content: space-around;
          font-weight: bolder;
        "
      >
        <div>ID</div>
        <div>Username</div>
        <div>Email</div>
        <div>img</div>
        <div>type</div>
        <div>status</div>
      </div>

      <!-- ส่วนของรายชื่อสมาชิกไล่ลงไป -->
      <div style="display: flex; justify-content: space-around">
        <div>1</div>
        <div>Username00001</div>
        <div>user01@gmail.com</div>
        <div>2491056.png</div>
        <div>User</div>
        <div>Active</div>
        <i to="adedituser" class="fa-solid fa-pen"></i>
        <i class="fa-solid fa-trash"></i>
      </div>

      <br />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default {
  name: "MyProfile ",
  setup() {
    return {
      search: ref(""),
    };
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

.flex .container {
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  padding: 20px 20px 20px 20px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background: white;
}

/* set up รูปโปรไฟล์ */
</style>
