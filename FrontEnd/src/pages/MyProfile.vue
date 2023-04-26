<template>
  <q-page class="BackGround flex flex-center column">
    <!-- ส่วนข้อมูลหลักของผู้ใช้ -->
    <div class="container-header" @click="toggleBtn">
      <div class="row fit">
        <div class="col self-start flex justify-start">
          <!-- รูปโปรไฟล์ -->
          <q-avatar size="65px" class="shadow-5">
            <q-img :src="UserData ? UserData.picture.path : ''" />
          </q-avatar>

          <!-- username และ bio -->
          <div
            class="details self-start"
            style="display: inline; margin-top: 10px"
          >
            <b class="text-start q-pl-md" style="color: #1a237e">
              {{ UserData.username }}</b
            >
            <p class="text-start q-pl-md" style="color: #5c6bc0">
              {{ UserData.bio }}
            </p>
          </div>
        </div>

        <div class="col fit self-end flex justify-end">
          <!-- :to="`/manageprofile/${id}`" -->
          <div v-if="authenStore.auth.id == id">
            <q-btn
              class="text-center"
              :to="`/manageprofile/${authenStore.auth.id}`"
              glossy
              push
              color="pink-9"
              :label="t('EditProfile')"
              @click="toggleFollow"
              style="height: 20px; margin-top: 5px"
            />
            <p
              class="text-center"
              style="margin-top: 5px; cursor: pointer"
              @click="alertFollower = true"
            >
              {{ entityUser ? entityUser["count"] : "" }} Follower
            </p>
          </div>
          <div v-else>
            <q-btn
              class="text-center"
              ref="followBtn"
              glossy
              push
              color="pink-9"
              :label="followLabel === 'Follow' ? t('Follow') : t('Following')"
              @click="toggleFollow"
              style="height: 20px; margin-top: 5px"
            />

            <p
              @click="alertFollower = true"
              class="text-center"
              style="margin-top: 5px; cursor: pointer"
            >
              {{ entityUser ? entityUser["count"] : "" }} {{ t("Followers") }}
            </p>
          </div>
          <!-- Pop up รายชื่อคนที่ติดตาม -->
          <q-dialog v-model="alertFollower">
            <q-card
              style="
                max-height: 400px;
                width: 300px;
                border-radius: 20px;
                padding: 10px 10px 10px 10px;
              "
            >
              <q-card-section>
                <div class="text-h6" style="font-weight: bold; color: #1a237e">
                  {{ t("ListFollower") }}
                </div>
              </q-card-section>

              <div v-for="(item, index) in entityListFollower" :key="index">
                <q-card-section
                  class="q-pt-none text-red"
                  v-if="entityUser.count > 0"
                >
                  <ion-avatar>
                    <img
                      :src="item.picture.path"
                      style="width: 30px; height: 30px"
                    />
                  </ion-avatar>
                  &nbsp;
                  <router-link
                    :to="'/myprofile/' + item.id"
                    style="text-decoration: none; color: #1d1917"
                  >
                    {{ item.username }}
                  </router-link>
                </q-card-section>
              </div>
              <q-card-section
                v-if="entityUser.count == 0"
                class="q-pb-xl text-center"
                style="color: #1a237e; font-size: large"
              >
                <q-item-label> {{ t("NotFound") }}</q-item-label>
              </q-card-section>
              <!-- ปุ่มโอเคของ Dialog -->
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>

    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div
      class="container-content"
      style="padding: 20px 20px 20px 20px; width: 500px"
    >
      <div class="q-pb-md" style="font-weight: bolder; color: #880e4f">
        <q-tabs>
          <q-tab
            @click="fetchPost"
            style="cursor: pointer; background-color: azure"
            >{{ t("Posted") }}</q-tab
          >
          <q-tab @click="findMyReplyPost" style="cursor: pointer">
            {{ t("Replied") }}
          </q-tab>
          <q-tab @click="findMyLikePost" style="cursor: pointer">
            {{ t("Liked") }}
          </q-tab>
        </q-tabs>
      </div>

      <!-- <hr
        style="
          border: 1px thin gray;
          margin: 15px 15px 15px 15px;
          color: #880e4f;
        "
      /> -->

      <!-- ส่วนของโพสต์ต่างๆของผู้ใช้ -->
      <q-scroll-area style="height: 280px; max-width: 500px">
        <div>
          <div v-if="PostList != null">
            <div class="post" v-for="(item, index) in PostList" :key="index">
              <router-link
                :to="'/postncomment/' + item.id"
                style="
                  text-decoration: none;
                  color: black;
                  font-weight: bolder;
                  color: #1a237e;
                "
                >{{ item.id }} {{ item.title }}</router-link
              ><br />
              <Content style="color: #5c6bc0">{{ item.content }}</Content
              ><br />
              <div class="row items-start q-mt-sm">
                <div class="col">
                  <ion-avatar>
                    <img
                      :src="item.picture.path"
                      style="width: 30px; height: 30px"
                    />
                  </ion-avatar>
                  <router-link
                    class="q-ml-sm"
                    :to="'/myprofile/' + item.user_id"
                    style="
                      text-decoration: none;
                      color: black;
                      font-weight: bolder;
                      color: #1a237e;
                    "
                  >
                    {{ item.username }} </router-link
                  >&nbsp;

                  <p style="display: inline; color: #5c6bc0">
                    {{ item.create_date }}
                  </p>
                </div>
                <div class="col self-end flex justify-end">
                  <i
                    class="fa-solid fa-heart self-center"
                    style="color: #880e4f"
                  ></i>
                  <i style="color: #880e4f; margin-right: 5px">{{
                    item.like_count
                  }}</i>
                  <i
                    class="fa-solid fa-comment self-center"
                    style="color: #880e4f"
                  ></i>
                  <i style="color: #880e4f; margin-right: 20px">{{
                    item.comment_count
                  }}</i>
                </div>
              </div>
              <hr style="border: 0.5px thin gray" />
            </div>
          </div>
          <div class="column fit content-center justify-end" v-else>
            <h6 class="q-pt-xl self-end" style="color: #880e4f">
              {{ t("NoPost") }}
            </h6>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { PostApi } from "src/api/PostApi";
import { UserApi } from "src/api/UserApi";
import { useRoute } from "vue-router";
import { FollowApi } from "src/api/FollowApi";
import { LocalStorage, useQuasar } from "quasar";
import { useAuthenStore } from "src/stores/authen";
import { AuthenApi } from "src/api/AuthenApi";

const { getUserDataByAuth } = AuthenApi();
const authenStore = useAuthenStore();
const { Follow, unFollow, countFol, checkFollower, showFollower } = FollowApi();
const { localeList, t, locale } = useLang();
const { findAllByMyPost, findAllByMyReplyPost, findAllByMyLikePost } =
  PostApi();
const { getOne } = UserApi();

const route = useRoute();
const UserData = ref("");
const PostList = ref([]);
const $q = useQuasar();
const id = ref();

const followLabel = ref("");

// ทำก่อน เวลาโหลดหน้าเว็บมา
onMounted(async () => {
  // if (route.params.user_id) {
  //   id.value = route.params.user_id;
  //   console.log("route user id", route.params.user_id);
  // }

  watchRoute();

  // if (id.value) {
  //   fetchUser();
  //   fetchPost();
  //   fetchCountFol();
  //   getUserDataByAuth;
  //   checkFol();
  //   fethFollower();
  // }
  // console.log(UserData);

  // if (followLabel.value) {
  //   followLabel.value = LocalStorage.getItem(followLabel1);
  // }
});

watch(route, async (newVal, oldVal) => {
  console.log("id from", oldVal, newVal);
  watchRoute();
});

const watchRoute = () => {
  if (route.params.user_id) {
    id.value = route.params.user_id;
    console.log("route user id", route.params.user_id);
  }

  if (id.value) {
    fetchUser();
    fetchPost();
    fetchCountFol();
    getUserDataByAuth;
    checkFol();
    fethFollower();
  }
  console.log(UserData);
};

//ฟังก์ชั่นโชว์รายชื่อผู้กดไลก์โพสต์
const alertFollower = ref(false);
const entityListFollower = ref([]);
const fethFollower = async () => {
  const response = await showFollower(id.value);
  console.log("Fetch Follower", response);
  if (response) {
    entityListFollower.value = response.dataList;
  }
};

// ปุ่ม Toggle เพิ่ม-ลดจำนวนผู้ติดตาม
function toggleFollow() {
  if (entityFollow.value.status != false) {
    unFol();

    // followColor.value = "secondary";
    // count.value += 1;
  } else {
    Fol();

    // followColor.value = "primary";
    // count.value -= 1;
  }
}

//นับจำนวนผู้ติดตาม
const entityUser = ref();
const fetchCountFol = async () => {
  const response = await countFol(id.value);
  console.log("countFol", response);
  if (response) {
    entityUser.value = response.entity;
  }
  console.log(entityUser.value.count);
};

//แสดงรายชื่อโพสต์
const fetchPost = async () => {
  const response = await findAllByMyPost(id.value);
  if (response) {
    PostList.value = response.dataList;
    console.log("PostList", PostList);
    if (PostList.value && PostList.value.length !== 0) {
      console.log("!= 0");
    } else {
      PostList.value = null;
      console.log(PostList.value);
    }
  }
};

//หาโพสต์ที่ฉันถูกใจ
const findMyLikePost = async () => {
  const response = await findAllByMyLikePost(id.value);
  if (response) {
    PostList.value = response.dataList;
    console.log("PostList", PostList);
    if (PostList.value && PostList.value.length !== 0) {
      console.log("!= 0");
    } else {
      PostList.value = null;
      console.log(PostList.value);
    }
  }
};

//หาโพสต์ที่ฉันตอบกลับ
const findMyReplyPost = async () => {
  const response = await findAllByMyReplyPost(id.value);
  if (response) {
    PostList.value = response.dataList;
    console.log("PostList", PostList);
    if (PostList.value && PostList.value.length !== 0) {
      console.log("!= 0");
    } else {
      PostList.value = null;
      console.log(PostList.value);
    }
  }
};

//แสดงข้อมูลผู้ใช้งาน โดยระบุ ID
const fetchUser = async () => {
  const response = await getOne(id.value);
  if (response) {
    UserData.value = response.entity;
    console.log(UserData);
    checkFol();
  }
};

// ฟังก์ชั่นการกดติดตาม โดยเพิ่ม 1 จำนวนผู้ติดตาม
const Fol = async () => {
  const response = await Follow(id.value);
  if (response) {
    console.log("Fol", response.message);
    fetchCountFol();
    checkFol();
    fethFollower();
    // count.value++;
  }
};

// ฟังก์ชั่นการติดตาม โดยลด 1 จำนวนผู้ติดตาม
const unFol = async () => {
  const response = await unFollow(id.value);
  if (response) {
    console.log("unFol", response.message);
    fetchCountFol();
    checkFol();
    fethFollower();
    // count.value--;
  }
};

const entityFollow = ref();
const checkFol = async () => {
  const response = await checkFollower(id.value);
  if (response) {
    entityFollow.value = response;
    console.log("checkFol", entityFollow);
    fetchCountFol();
    if (entityFollow.value.status === true) {
      followLabel.value = "Following";
    } else {
      followLabel.value = "Follow";
    }
  }
};

// ทดลองอะไรบางอย่าง ตอนนี้ยังไม่ได้ใช้
// watch(followLabel, async (newVal, oldVal) => {
//   console.log("follow update", oldVal, newVal);
//   LocalStorage.set(followLabel1, newVal);
// });
</script>

<style scoped>
.BackGround {
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
  padding: 20px 20px 10px 20px;
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
</style>
