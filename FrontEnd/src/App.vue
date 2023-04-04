<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { AuthenApi } from "src/api/AuthenApi";
import { useAuthenStore } from "src/stores/authen";
const { getUserDataByAuth } = AuthenApi();
const authenStore = useAuthenStore();
onMounted(() => {
  fetchUserData();
});
const fetchUserData = async () => {
  const response = await getUserDataByAuth();
  console.log("App.vue> getUserDataByAuth", response);
  if (response && response.userData) {
    authenStore.setAuthen(response.userData);
  }
};
</script>
