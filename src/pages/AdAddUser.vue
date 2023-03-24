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
          color: #880e4f;
        "
      >
        ✧･ﾟ เพิ่มผู้ใช้ใหม่ ｡･✧
      </p>
      <br />

      <!-- ส่วนของการเปลี่ยนอีเมล -->
      <i style="color: #c51162">อีเมล (Email) :</i>
      <q-input
        filled
        v-model="text"
        :dense="dense"
        style="width: 300px; margin-bottom: 7px"
      />

      <!-- ส่วนของการแก้ไข password -->
      <i style="color: #c51162">รหัสผ่าน (Password) :</i>
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        style="width: 300px; color: #c51162"
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

      <!-- ส่วนของปุ่ม Submit -->
      <q-btn
        glossy
        push
        color="pink-10"
        label="บันทึก"
        style="margin-top: 20px; margin-left: 230px"
      />
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
      isPwd: ref(true),
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
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 50px 25px 50px;
  background: white;
}
</style>
