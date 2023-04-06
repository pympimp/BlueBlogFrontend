<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลหลักของผู้ใช้ -->
    <div class="container-header">
      <!-- รูปโปรไฟล์ -->
      <q-avatar v-if="authenStore.auth.picture" size="65px" class="shadow-5">
        <q-img :src="authenStore.auth.picture.path" />
      </q-avatar>
      <!-- username และ bio -->
      <div
        class="details"
        style="display: inline; margin-left: -150px; margin-top: 10px"
      >
        <b style="color: #1a237e"> {{ authenStore.auth.username }}</b>
        <p style="color: #5c6bc0">{{ authenStore.auth.bio }}</p>
      </div>
      <q-btn
        to="manageprofile"
        glossy
        push
        color="pink"
        :label="t('Manage')"
        style="height: 20px"
      />
    </div>

    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div
      class="container-content"
      style="padding: 20px 20px 20px 20px; width: 500px"
    >
      <div
        style="
          display: flex;
          justify-content: space-around;
          font-weight: bolder;
          color: #880e4f;
        "
      >
        <div>{{ t("Posted") }}</div>
        <div>{{ t("Replied") }}</div>
        <div>{{ t("Liked") }}</div>
      </div>
      <hr
        style="
          border: 1px thin gray;
          margin: 15px 15px 15px 15px;
          color: #880e4f;
        "
      />

      <!-- ส่วนของโพสต์ต่างๆของผู้ใช้ -->
      <q-scroll-area style="height: 200px; max-width: 500px">
        <div class="post" v-for="(item, index) in PostList" :key="index">
          <router-link
            :to="`/postncomment/${item.id}`"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >{{ item.content }}
          </router-link>
          <p style="color: #5c6bc0">{{ item.create_date }}</p>
          <!-- <hr style="border: 0.5px thin gray" /> -->
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { useAuthenStore } from "src/stores/authen";
import { AuthenApi } from "src/api/AuthenApi";
import { PostApi } from "src/api/PostApi";

const { localeList, t, locale } = useLang();
const authenStore = useAuthenStore();
const { getOneUserPost } = PostApi();

const PostList = ref([]);

onMounted(async () => {
  fetchPost();
});

const fetchPost = async () => {
  const response = await getOneUserPost(authenStore.auth.id);
  if (response) {
    PostList.value = response.dataList;
    console.log(PostList);
  }
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
.container-header {
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  width: 500px;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 20px 20px 20px 20px;
  background: white;
}

.container-content {
  opacity: 0.8;
  width: 700px;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

/* set up รูปโปรไฟล์ */
</style>
