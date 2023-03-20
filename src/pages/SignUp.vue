<template>
  <q-page class="flex flex-center">
    <div class="container">
      <h5>Sign Up</h5>
      <q-input
        v-model="email"
        filled
        type="email"
        placeholder="Email"
        style="width: 250px"
      />
      <br />
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        placeholder="Password"
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
        <p style="display: inline">Already have an account?</p>
        <router-link to="/login">Click</router-link>
      </section>
      <br />
      <q-btn push color="indigo-5" label="Submit" to="login" />
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
  opacity: 0.9;
  width: 100%;
  height: auto;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
  width: 400px;
  height: 400px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}
.container:hover {
  transform: scale(1.02);
}
</style>
