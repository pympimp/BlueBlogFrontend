<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลหลักของผู้ใช้ -->
    <div class="container-header">
      <!-- รูปโปรไฟล์ -->
      <q-avatar size="65px" class="shadow-5">
        <q-img :src="UserData ? UserData.picture.path : ''" />
      </q-avatar>
      <!-- username และ bio -->
      <div
        class="details"
        style="display: inline; margin-left: -150px; margin-top: 10px"
      >
        <b class="text-start" style="color: #1a237e">
          {{ UserData.username }}</b
        >
        <p class="text-start" style="color: #5c6bc0">{{ UserData.bio }}</p>
      </div>

      <!-- :to="`/manageprofile/${id}`" -->
      <div>
        <q-btn
          ref="followBtn"
          glossy
          push
          :color="followColor"
          :label="followLabel"
          @click="toggleFollow"
          style="height: 20px; margin-top: 5px"
        />

        <p class="text-center" style="margin-top: 5px">
          Followers: {{ followers }}
        </p>
      </div>
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
        <div @click="fetchPost">{{ t("Posted") }}</div>
        <div @click="findMyReplyPost">{{ t("Replied") }}</div>
        <div @click="findMyLikePost">{{ t("Liked") }}</div>
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
import { PostApi } from "src/api/PostApi";
import { UserApi } from "src/api/UserApi";
import { useRoute } from "vue-router";

const { localeList, t, locale } = useLang();
const {
  getOneUserPost,
  findAllByMyPost,
  findAllByMyReplyPost,
  findAllByMyLikePost,
} = PostApi();
const { getOne } = UserApi();

const UserData = ref("");
const PostList = ref([]);

const followers = ref(0);
const followLabel = ref("Follow");
const followColor = ref("primary");
function toggleFollow() {
  if (followLabel.value === "Follow") {
    followLabel.value = "Following";
    followColor.value = "secondary";
    followers.value += 1;
  } else {
    followLabel.value = "Follow";
    followColor.value = "primary";
    followers.value -= 1;
  }
}

const id = ref();
const route = useRoute();
onMounted(async () => {
  if (route.params.user_id) {
    id.value = route.params.user_id;
  }
  if (id.value) {
    fetchUser();
    fetchPost();
  }
  console.log(UserData);
});

const fetchPost = async () => {
  const response = await findAllByMyPost(id.value);
  if (response) {
    PostList.value = response.dataList;
    console.log(PostList);
  }
};

const findMyLikePost = async () => {
  const response = await findAllByMyLikePost(id.value);
  if (response) {
    PostList.value = response.dataList;
    console.log(PostList);
  }
};

const findMyReplyPost = async () => {
  const response = await findAllByMyReplyPost(id.value);
  if (response) {
    PostList.value = response.dataList;
    console.log(PostList);
  }
};

const fetchUser = async () => {
  const response = await getOne(id.value);
  if (response) {
    UserData.value = response.entity;
    console.log(UserData);
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
