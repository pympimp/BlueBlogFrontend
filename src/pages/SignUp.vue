<template>
  <q-page class="flex flex-center">
    <div class="container">
      <h5>สมัครสมาชิก</h5>
      <q-input
        v-model="email"
        filled
        type="email"
        placeholder="อีเมล"
        style="width: 250px"
      />
      <br />
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        placeholder="รหัสผ่าน"
        style="width: 250px"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <br />
      <section>
        <p style="display: inline">มีบัญชีอยู่แล้ว?</p>
        <router-link to="/login"> คลิกเลย!</router-link>
      </section>
      <br />
      <q-btn push color="grey-7" label="ยืนยัน" to="login" />
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
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
  width: 350px;
  height: 390px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}
.container:hover {
  transform: scale(1.02);
}

a {
  color: indigo;
  text-decoration: none;
}
</style>
