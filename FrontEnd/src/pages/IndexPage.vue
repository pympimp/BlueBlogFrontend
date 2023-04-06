<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="q-pa-md">
        <p
          style="
            font-size: 25px;
            font-weight: bolder;
            margin-bottom: -10px;
            color: #880e4f;
          "
        >
          🏠&nbsp; {{ $t("MainPage") }}
        </p>

        <q-btn-dropdown
          split
          glossy
          color="pink"
          rounded
          :label="t('FilterPost')"
          style="display: inline; margin-bottom: 20px; margin-left: 580px"
        >
          <q-list>
            <q-item clickable v-close-popup @click="change('CreateDateASC')">
              <q-item-section>
                <q-item-label>{{ $t("PostOld") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="change('CreateDateDesc')">
              <q-item-section>
                <q-item-label>{{ $t("PostNew") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="change('PopularAsc')">
              <q-item-section>
                <q-item-label>{{ $t("PopMore") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="change('PopularDesc')">
              <q-item-section>
                <q-item-label>{{ $t("PopLess") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <!-- ----------------------------------------------------------------------------------------------------------- -->
        <div class="q-pa-md">
          <!-- <q-infinite-scroll :distance="1" :disable="currentPage >= totalPage"> -->
          <q-scroll-area style="height: 380px">
            <!-- Post -->
            <!-- loop ข้อมูลโพสต์ -->
            <section
              class="post"
              v-for="(item, index) in postList"
              :key="index"
            >
              <router-link
                :to="'/postncomment/' + item.id"
                style="
                  text-decoration: none;
                  color: black;
                  font-weight: bolder;
                  color: #1a237e;
                "
                >? {{ item.id }} {{ item.title }}
              </router-link>
              <br />
              <Content style="color: #5c6bc0"> {{ item.content }} </Content
              ><br />
              <ion-avatar>
                <img :src="item.picture.x" style="width: 30px; height: 30px" />
              </ion-avatar>
              &nbsp;
              <router-link
                :to="'/myprofile/' + item.user_id"
                style="
                  text-decoration: none;
                  color: black;
                  font-weight: bolder;
                  color: #1a237e;
                "
              >
                {{ item.username }}
              </router-link>
              &nbsp;
              <!-- ส่วนของไลก์และคอมเมนต์ -->
              <p style="display: inline; color: #5c6bc0">
                {{ item.create_date }}
              </p>
              <i
                class="fa-solid fa-heart"
                style="color: #880e4f; margin-left: 370px"
              ></i>
              <i style="color: #880e4f; margin-right: 5px">
                {{ item.like_count }}
              </i>
              <i class="fa-solid fa-comment" style="color: #880e4f"></i>
              <i style="color: #880e4f; margin-right: 5px">
                {{ item.comment_count }}
              </i>
              <hr style="width: 650px" />
            </section>
            <!-- post -->

            <!-- loading -->
            <div
              class="row justify-center q-my-md"
              v-if="postList.length"
              v-intersection="handleScrolledToBottom"
            >
              <q-spinner-dots
                v-if="loading === false"
                color="primary"
                size="40px"
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

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { biTranslate, biGlobe, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

import { useAxios } from "src/composables/useAxios";
// เรียกใช้ Post API
import { PostApi } from "src/api/PostApi";

export default {
  name: "MyLayout",
  setup() {
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
    const url = ref("CreateDateDesc");

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    // แสดง List Post
    onMounted(async () => {
      fetchList();
    });

    // const fetchList = async () => {
    //   const response = await getPostList({
    //     page: currentPage.value, //method: "GET",
    //     perPage: recordPerPage.value,
    //     body: url.value,
    //   });
    //   if (response) {
    //     // postList.value = response.dataList;
    //     postList.value.push(...response.dataList);
    //     totalPage.value = response.appPagination;
    //     console.log(response);
    //   }
    // };

    // change url
    const change = async (value) => {
      // กำหนดให้ postList.value เป็น array ว่าง
      postList.value = [];

      // เปลี่ยน url
      url.value = value;

      // recordPerPage.value = 3;
      currentPage.value = 1;

      // โหลดข้อมูลใหม่
      // await fetchList();
    };

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
      }
    };

    // fetchList();
    watch(url, () => {
      fetchList();
    });

    // watch(currentPage, async (newVal, oldVal) => {
    //   fetchList();
    //   console.log("CurrentPage change from", newVal);
    // });
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

    return {
      localeList,
      t,
      locale,
      biGlobe,
      biCheck,
      biTranslate,
      fabYoutube,
      leftDrawerOpen,
      search,
      // return รายการข้อมูล
      currentPage,
      totalPage,
      // fetchList,
      toggleLeftDrawer,
      handleScrolledToBottom,
      loading,
      links1: [
        { icon: "home", text: "Home", link: "/" },
        { icon: "whatshot", text: "List Page", link: "/list-page" },
        { icon: "subscriptions", text: "Subscriptions" },
        { icon: biTranslate, text: "Translate", link: "/locale-page" },
      ],
      postList,
      // คัดเลือกโพสต์
      change,
      url,
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
