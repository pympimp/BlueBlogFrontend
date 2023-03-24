<template>
  <q-page class="flex flex-center" style="display: flex">
    <div style="margin-right: 20px">
      <!-- ส่วนของ Total User -->
      <div
        class="container"
        style="width: 250px; height: 250px; margin-bottom: 20px"
      >
        <p
          style="
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
          "
        >
          Total User
        </p>
      </div>

      <!-- ส่วนของ Total Post -->
      <div class="container" style="width: 250px; height: 250px">
        <p
          style="
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
          "
        >
          Total Post
        </p>
      </div>
    </div>

    <!-- ส่วนของ User Statistics -->
    <div class="container" style="width: 600px; height: 520px">
      <p
        style="
          font-size: 20px;
          font-weight: bolder;
          margin-bottom: -10px;
          display: flex;
          justify-content: center;
        "
      >
        User Statistics
      </p>
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
