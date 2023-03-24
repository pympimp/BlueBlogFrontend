<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div class="container">
      <!-- ส่วนของหัวข้อ  'จัดการรายชื่อผู้ใช้งาน (Manage User)' -->
      <p
        style="
          font-size: 25px;
          font-weight: bolder;
          margin-left: 20px;
          margin-bottom: -10px;
          position: absolute;
          color: #880e4f;
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
        style="width: 250px; position: absolute; right: 430px"
      >
        <template v-slot:append>
          <q-icon name="search" color="pink" />
        </template>
      </q-input>

      <!-- ส่วนของปุ่มเพิ่มผู้ใช้งาน (Add) -->
      <q-btn
        to="adadduser"
        glossy
        color="pink"
        label="เพิ่มผู้ใช้"
        style="bottom: -3px; left: 645px; margin-bottom: 5px"
      />

      <!-- เส้นขีด -->
      <hr
        style="
          border: 0.6px thin gray;
          margin: 15px 15px 15px 15px;
          width: 720px;
          color: #78728a;
        "
      />

      <!-- ส่วนของหัวข้ออย่างเช่น ID Username etc. -->
      <div
        style="
          display: flex;
          justify-content: space-around;
          font-weight: bolder;
          color: #1d366f;
        "
      >
        <div style="transform: scale(1) translate(-100%, 0%)">ID</div>
        <div style="transform: scale(1) translate(-80%, 0%)">Username</div>
        <div style="transform: scale(1) translate(-120%, 0%)">Email</div>
        <div style="transform: scale(1) translate(-100%, 0%)">img</div>
        <div style="transform: scale(1) translate(-175%, 0%)">type</div>
        <div style="transform: scale(1) translate(-265%, 0%)">status</div>
      </div>

      <!-- ส่วนของรายชื่อสมาชิกไล่ลงไป -->
      <div class="q-ma-md">
        <q-scroll-area style="height: 200px">
          <div v-for="n in 100" :key="n" class="q-py-xs">
            <div
              style="
                display: flex;
                justify-content: space-around;
                color: #78728a;
              "
            >
              <div>1</div>
              <div>Username00001</div>
              <div>user01@gmail.com</div>
              <div>2491056.png</div>
              <div>User</div>
              <div>Active</div>
              <router-link to="adedituser"
                ><i class="fa-solid fa-pen" style="color: #78728a"></i
              ></router-link>
              <i class="fa-solid fa-trash" style="margin-top: 4px"></i>
            </div>

            <div
              style="
                display: flex;
                justify-content: space-around;
                color: #78728a;
              "
            >
              <div>2</div>
              <div>Username00002</div>
              <div>user02@gmail.com</div>
              <div>2491056.png</div>
              <div>User</div>
              <div>Active</div>
              <router-link to="adedituser"
                ><i class="fa-solid fa-pen" style="color: #78728a">
                  <q-tooltip transition-show="scale" transition-hide="scale">
                    เพิ่มโพสต์ใหม่
                  </q-tooltip></i
                ></router-link
              >
              <i class="fa-solid fa-trash" style="margin-top: 4px"></i>
            </div>
          </div>
        </q-scroll-area>
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
  padding: 20px 20px 5px 20px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background: white;
}

/* set up รูปโปรไฟล์ */
</style>
