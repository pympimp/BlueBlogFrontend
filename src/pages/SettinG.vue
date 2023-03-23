<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- หัวข้อ Edit Profile -->
      <p style="font-size: 25px; font-weight: bolder">การตั้งค่า</p>

      <!-- ส่วนของการแก้ไข username -->
      <b style="margin-right: 210px">อีเมล (Email) :</b>
      <q-input
        filled
        v-model="text"
        :dense="dense"
        style="width: 300px; margin-bottom: 20px"
      />

      <!-- ส่วนของการแก้ไข password -->
      <b style="margin-right: 170px">รหัสผ่าน (Password) :</b>
      <q-input
        v-model="password"
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

      <!-- ส่วนของปุ่ม Submit -->
      <q-btn
        glossy
        push
        color="pink"
        label="บันทึก"
        style="margin-top: 20px; margin-left: 270px"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default {
  name: "SettinG ",
  setup() {
    return {
      text: ref(""),
      password: ref(""),
      isPwd: ref(true),
      email: ref(""),
      search: ref(""),
      tel: ref(""),
      url: ref(""),
      time: ref(""),
      date: ref(""),
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
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 30px 25px 30px;
  background: white;
}
</style>
