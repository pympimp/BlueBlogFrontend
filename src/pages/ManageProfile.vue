<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- หัวข้อ Edit Profile -->
      <p style="font-size: 25px; font-weight: bolder">แก้ไขโปรไฟล์</p>

      <!-- รูปโปรไฟล์ -->
      <div class="top" style="display: inline">
        <ion-avatar class="profile" style="">
          <img
            src="/public/pf1.png"
            style="width: 50px; height: 50px; margin-bottom: 10px"
          />
        </ion-avatar>

        <!-- ส่วนของการแทรกไฟล์รูปภาพ -->
        <div style="display: inline">
          <q-input
            @update:model-value="
              (val) => {
                files = val;
              }
            "
            multiple
            type="file"
            style="width: 200px,height: 0px;"
            borderless
          />
        </div>

        <!-- ส่วนของการแก้ไข username -->
        <b>ชื่อผู้ใช้งาน (Username) :</b>
        <q-input
          filled
          v-model="text"
          :dense="dense"
          style="width: 350px; margin-bottom: 15px"
        />

        <!-- ส่วนของการแก้ไข bio -->
        <b style="">คำแนะนำตัว (Bio) :</b>
        <!-- <div class="q-pa-md" style="max-width: 1000px; width: 350px"> -->
        <q-input v-model="text" filled type="textarea" style="width: 359px" />
        <!-- </div> -->

        <!-- ส่วนของปุ่ม Submit -->
        <q-btn
          glossy
          push
          color="pink"
          label="บันทึก"
          style="margin-top: 20px; margin-left: 300px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default {
  name: "MyProfile ",
  setup() {
    return {
      text: ref(""),
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

.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 50px 25px 50px;
  background: white;
}
</style>
