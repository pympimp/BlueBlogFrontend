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
        ✧･ﾟ แก้ไขข้อมูลผู้ใช้ ｡･✧
      </p>

      <br />
      <!-- ส่วนของการเปลี่ยนอีเมล -->
      <i style="color: #5c6bc0">อีเมล (Email) :</i>
      <q-input
        filled
        v-model="text"
        :dense="dense"
        style="width: 300px; margin-bottom: 7px"
      />

      <!-- ส่วนของการแก้ไข password -->
      <i style="color: #5c6bc0">รหัสผ่าน (Password) :</i>
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        style="width: 300px; margin-bottom: 20px"
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
      <i style="color: #5c6bc0">สถานะผู้ใช้งาน (status)</i> <br />
      <q-toggle
        v-model="third"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      />

      <!-- ส่วนของปุ่ม Submit -->
      <q-btn
        glossy
        push
        color="indigo-10"
        label="บันทึก"
        style="margin-top: -20px; margin-left: 180px"
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
      third: ref(false),
      isPwd: ref(false),
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
