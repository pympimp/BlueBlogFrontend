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
        "
      >
        ✧･ﾟ แก้ไขข้อมูลผู้ใช้ ｡･✧
      </p>

      <br />
      <!-- ส่วนของการเปลี่ยนอีเมล -->
      <b>อีเมล (Email) :</b>
      <q-input
        filled
        v-model="text"
        :dense="dense"
        style="width: 300px; margin-bottom: 7px"
      />

      <!-- ส่วนของการแก้ไข username -->
      <b>รหัสผ่าน (Password) :</b>
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
      <b>สถานะผู้ใช้งาน (status)</b> <br />
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
        color="pink"
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
