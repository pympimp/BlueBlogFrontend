<template>
  <q-page class="background flex flex-center">
    <div class="container">
      <div class="q-pa-md">
        <p
          class="q-pb-xs text-left"
          style="font-size: 25px; font-weight: bolder; color: #880e4f"
        >
          🏠&nbsp; {{ $t("MyFeed") }}
        </p>

        <!-- ----------------------------------------------------------------------------------------------------------- -->
        <div class="q-pa-md">
          <!-- <q-infinite-scroll :distance="1" :disable="currentPage >= totalPage"> -->
          <q-scroll-area style="height: 380px; width: 700px">
            <!-- Post -->
            <!-- loop ข้อมูลโพสต์ -->
            <section
              class="post"
              v-for="(item, index) in postList"
              :key="index"
            >
              <router-link
                :to="'/postncomment/' + item.postId"
                style="
                  text-decoration: none;
                  color: black;
                  font-weight: bolder;
                  color: #1a237e;
                "
                >{{ item.postId }} {{ item.title }}
              </router-link>
              <br />
              <Content style="color: #5c6bc0"> {{ item.content }} </Content
              ><br />
              <div class="row">
                <div class="col">
                  <ion-avatar>
                    <img
                      :src="item.picture.x"
                      style="width: 30px; height: 30px"
                    />
                  </ion-avatar>
                  &nbsp;
                  <router-link
                    :to="'/myprofile/' + item.postUserId"
                    style="
                      text-decoration: none;
                      color: black;
                      font-weight: bolder;
                      color: #1a237e;
                    "
                  >
                    {{ item.postUserUsername }}
                  </router-link>
                  &nbsp;
                  <p style="display: inline; color: #5c6bc0">
                    {{ item.create_date }}
                  </p>
                </div>
                <!-- ส่วนของไลก์และคอมเมนต์ -->
                <div class="col self-end flex justify-end">
                  <i class="fa-solid fa-heart" style="color: #880e4f"></i>
                  <i style="color: #880e4f; margin-right: 5px">
                    {{ item.like_count }}
                  </i>
                  <i class="fa-solid fa-comment" style="color: #880e4f"></i>
                  <i style="color: #880e4f; margin-right: 40px">
                    {{ item.comment_count }}
                  </i>
                </div>
              </div>
              <hr style="width: 650px" />
            </section>

            <!-- loading -->
            <div
              class="row justify-center q-my-md"
              v-if="postList.length"
              v-intersection="handleScrolledToBottom"
            >
              <q-spinner-bars
                v-if="loading === false"
                color="indigo-10"
                size="2em"
              />
            </div>
          </q-scroll-area>
          <!-- loading -->
          <!-- </q-infinite-scroll> -->
        </div>
        <!-- ----------------------------------------------------------------------------------------------------------- -->
      </div>
      <!-- <p>Page : {{ currentPage }}</p> -->
      <!-- เลขหน้า -->
      <!-- <div class="q-gutter-md" style="display: flex; justify-content: center">
        <q-pagination
          v-model="currentPage"
          :max="totalPage"
          direction-links
          flat
          color="grey"
          active-color="pink"
        />
      </div> -->
      <!-- เลขหน้า -->
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { biTranslate, biGlobe, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

import { useAxios } from "src/composables/useAxios";
// เรียกใช้ Post API
import { PostApi } from "src/api/PostApi";

const { getPostList } = PostApi();

// ตัวแปรแสดงข้อมูลโพสต์
const postList = ref([]);
// เลขหน้าเพจ
const currentPage = ref(1);
// จำนวนรายการ
const recordPerPage = ref(3);
const totalPage = ref(0);
const loading = ref(false);

const { localeList, t, locale } = useLang();
const leftDrawerOpen = ref(false);
const search = ref("");

// คัดเลือกโพสต์ post
const url = ref("MyFollow");

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
// แสดง List Post
onMounted(async () => {
  fetchList();
});

const fetchList = async () => {
  const response = await getPostList({
    page: currentPage.value,
    perPage: recordPerPage.value,
    body: url.value,
  });

  if (response) {
    // เก็บข้อมูลใหม่ลงใน postList.value
    postList.value.push(...response.dataList);

    // อัปเดตค่า totalPage.value
    totalPage.value = response.appPagination;
    console.log(response);
    if (postList.value && postList.value.length !== 0) {
      console.log("!= 0");
    } else {
      postList.value = null;
      console.log(postList.value);
    }
  }
};

// fetchList();
watch(url, () => {
  fetchList();
});

// เมื่อเลื่อน Scroll ลงมา
const handleScrolledToBottom = (isVisible) => {
  setTimeout(() => {
    loading.value = true;
    if (!isVisible) {
      return;
    }
    if (currentPage.value >= totalPage.value) {
      return;
    }
    // เพิ่มหน้ารายการ ทีละ 2 รายการ
    currentPage.value++;
    // recordPerPage.value = 2;
    fetchList();
    // ถ้าหมดแล้วจะ timelog
    console.log("timeout");
    loading.value = false;
    // มีการรอ loading
  }, 2000);
};
</script>

<style scoped>
.background {
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
  width: 800px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
  justify-items: space-around;
  margin-top: 50px; /* เว้นระยะห่างด้านบน */
  margin-bottom: 50px; /* เว้นระยะห่างด้านล่าง */
}
</style>
