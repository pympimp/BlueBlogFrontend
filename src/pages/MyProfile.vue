<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลหลักของผู้ใช้ -->
    <div class="container-header">
      <!-- รูปโปรไฟล์ -->

      <ion-avatar class="profile" style="display: inline">
        <img src="/public/pf1.png" style="width: 70px; height: 70px" />
      </ion-avatar>
      <!-- username และ bio -->
      <div
        class="details"
        style="display: inline; margin-left: -150px; margin-top: 10px"
      >
        <b> Username00009</b>
        <p>" โย่ว"</p>
      </div>
      <q-btn
        to="manageprofile"
        glossy
        push
        color="pink"
        label="แก้ไขโปรไฟล์"
        style="height: 20px"
      />
    </div>

    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div
      class="container-content"
      style="padding: 20px 20px 20px 20px; width: 500px"
    >
      <div
        style="
          display: flex;
          justify-content: space-around;
          font-weight: bolder;
        "
      >
        <div>โพสต์ที่ตั้ง</div>
        <div>โพสต์ที่ตอบกลับ</div>
        <div>โพสต์ที่ถูกใจ</div>
      </div>
      <hr style="border: 0.6px thin gray; margin: 15px 15px 15px 15px" />

      <!-- ส่วนของโพสต์ต่างๆของผู้ใช้ -->
      <div class="post">
        <router-link
          to="postncomment"
          style="text-decoration: none; color: black; font-weight: bolder"
          >ร้านค้าที่รับแต่เงินสด ไม่เสียดายลูกค้าบ้างหรอครับ
        </router-link>
        <p>28 กุมภาพันธ์ 2566</p>
        <!-- <hr style="border: 0.5px thin gray" /> -->

        <router-link
          to="postncomment"
          style="text-decoration: none; color: black; font-weight: bolder"
          >ไปเที่ยวเกาะหมากนอนรีสอร์ตไหนดี?</router-link
        >
        <p>5 มีนาคม 2566</p>

        <!-- <hr style="border: 0.5px thin gray" /> -->

        <router-link
          to="postncomment"
          style="text-decoration: none; color: black; font-weight: bolder"
          >โอนเงินจากทรูมันนี่ไปธนาคารเลขบัญชีผิดทำอย่างไรดี</router-link
        >
        <p>18 สิงหาคม 2566</p>
      </div>
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
