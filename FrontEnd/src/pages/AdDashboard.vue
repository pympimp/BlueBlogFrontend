<template>
  <q-page class="flex flex-center" style="display: flex">
    <div style="margin-right: 20px">
      <!-- ส่วนของหัวข้อ Total User -->
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
            color: #f48a1e;
          "
        >
          [ {{ t("TotalUser") }} ]
        </p>
        <br /><br />

        <!-- รูปภาพ Total User -->
        <img
          src="public/ad-user.png"
          style="width: 70px; height: 70px; margin-left: 42px"
        />
        <br /><br />

        <!-- จำนวน Total User -->
        <p style="text-align: center; color: #827b7e">
          {{ entityUser ? entityUser["count_created_at"] : "" }}
          {{ t("UserAm") }}
        </p>
      </div>

      <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

      <!-- ส่วนของ Total Post -->
      <div class="container" style="width: 250px; height: 250px">
        <p
          style="
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
            color: #d4397a;
          "
        >
          [ {{ t("TotalPost") }} ]
        </p>
        <br />
        <br />

        <!-- ส่วนของรูปภาพ Total Post -->
        <img
          src="public/ad-post.png"
          alt=""
          style="width: 70px; height: 70px; margin-left: 42px"
        />
        <br /><br />

        <!-- ส่วนของจำนวน Total Post -->
        <p style="text-align: center; color: #827b7e">
          {{ entityPost ? entityPost["count_created_at"] : "" }}
          {{ t("PostAm") }}
        </p>
      </div>
    </div>

    <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

    <!-- ส่วนของ User Statistics -->
    <div
      class="container"
      style="width: 600px; height: 520px; padding: 30px 50px 0px 50px"
    >
      <b
        style="
          font-size: 30px;
          color: #2786d7;
          font-weight: bolder;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        "
        >[ {{ t("UserStatis") }} ]</b
      >
      <p></p>
      <p></p>
      <useChart></useChart>
      <p style="margin-left: 150px; color: #827b7e">
        {{ t("AllUser") }}
      </p>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useLang } from "src/composables/useLang";
import { useAxios } from "src/composables/useAxios";
// เรียกใช้ Dashboard Api
import { DashboardApi } from "src/api/DashboardApi";

const useChart = defineAsyncComponent(() => import("components/MyChart.vue"));
const { localeList, t, locale } = useLang();

// countPost
const { countPost } = DashboardApi();
const entityPost = ref();
// countUser
const { countUser } = DashboardApi();
const entityUser = ref();

const fetchDataPost = async () => {
  const response = await countPost();
  console.log("countPost", response);
  if (response) {
    entityPost.value = response.entity;
  }
};

const fetchDataUser = async () => {
  const response = await countUser();
  console.log("countUser", response);
  if (response) {
    entityUser.value = response.entity;
  }
};

fetchDataPost();
fetchDataUser();
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
