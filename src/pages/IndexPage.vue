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
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>{{ $t("PostOld") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>{{ $t("PostNew") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>{{ $t("PopMore") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>{{ $t("PopLess") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <section class="post">
          <router-link
            to="/postncomment"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >? ทำไมนรกต้องใช้กระทะทองแดง</router-link
          >
          <br />
          <Content style="color: #5c6bc0"
            >ทำไมนรกต้องใช้กระทะทองแดง ทำไมไม่ใช้กระทะเงิน
            ซึ่งนำความร้อนได้ดีกว่า</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf1.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <router-link
            to="/myprofile"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >User0001</router-link
          >
          &nbsp;
          <!-- ส่วนของไลก์และคอมเมนต์ -->
          <p style="display: inline; color: #5c6bc0">3 มีนาคม 2566</p>
          <i
            class="fa-solid fa-heart"
            style="color: #880e4f; margin-left: 420px"
          ></i>
          <i style="color: #880e4f; margin-right: 10px">24</i>
          <i class="fa-solid fa-comment" style="color: #880e4f"></i>
          <i style="color: #880e4f; margin-right: 10px">20</i>

          <hr style="width: 700px" />
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->

        <section class="post">
          <router-link
            to="/postncomment"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >? ต้นมะนาวบนหลุมศพหมาที่โดนงูเห่ากัด</router-link
          >
          <br />
          <Content style="color: #5c6bc0"
            >ปลูกต้นมะนาวไว้บนหลุมศพหมาที่โดนงูเห่ากัด กินได้ไหมคะ
            มีอันตรายจากพิษงูไหม</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf2.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <router-link
            to="/myprofile"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >User0002</router-link
          >
          &nbsp;
          <p style="display: inline; color: #5c6bc0">9 พฤษภาคม 2566</p>

          <!-- ส่วนของไลก์และคอมเมนต์ -->
          <i
            class="fa-solid fa-heart"
            style="color: #880e4f; margin-left: 420px"
          ></i>
          <i style="color: #880e4f; margin-right: 10px">24</i>
          <i class="fa-solid fa-comment" style="color: #880e4f"></i>
          <i style="color: #880e4f; margin-right: 10px">20</i>
          <hr style="width: 700px" />
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->

        <section class="post">
          <router-link
            to="/postncomment"
            class="post"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >?
            พ่อขุนรามนี่ถือว่าได้เป็นอัจฉริยะทางภาษาหรือเปล่าครับ</router-link
          >
          <br />
          <Content style="color: #5c6bc0"
            >หลักการสร้างตัวอักษรและการสะกดคำ ท่านได้แนวคิดมาจากไหน
            มีเหตุจำเป็นอะไรที่ต้องสร้างอักษรไทย</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf3.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <router-link
            to="/myprofile"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >User0003</router-link
          >
          &nbsp;
          <p style="display: inline; color: #5c6bc0">17 สิงหาคม 2566</p>

          <!-- ส่วนของไลก์และคอมเมนต์ -->
          <i
            class="fa-solid fa-heart"
            style="color: #880e4f; margin-left: 420px"
          ></i>
          <i style="color: #880e4f; margin-right: 10px">24</i>
          <i class="fa-solid fa-comment" style="color: #880e4f"></i>
          <i style="color: #880e4f; margin-right: 10px">20</i>
          <hr style="width: 700px" />
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->
        <section class="post">
          <router-link
            to="/postncomment"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >แบ่งปัน 7 ไอเทมเด็ดที่ควรมีติดกระเป๋า!</router-link
          >
          <br />
          <Content style="color: #5c6bc0"
            >สวัสดีชาวบลูทุกท่านค่ะ
            วันนี้เราจะมาแบ่งปันไอเทมที่มีติดกระเป๋าแล้วชีวิตง่ายขึ้นแบบ
            200%</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf4.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <router-link
            to="/myprofile"
            style="
              text-decoration: none;
              color: black;
              font-weight: bolder;
              color: #1a237e;
            "
            >User0004</router-link
          >
          &nbsp;
          <p style="display: inline; color: #5c6bc0">24 ธันวาคม 2566</p>
          <!-- ส่วนของไลก์และคอมเมนต์ -->
          <i
            class="fa-solid fa-heart"
            style="color: #880e4f; margin-left: 420px"
          ></i>
          <i style="color: #880e4f; margin-right: 10px">24</i>
          <i class="fa-solid fa-comment" style="color: #880e4f"></i>
          <i style="color: #880e4f; margin-right: 10px">20</i>
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { biTranslate, biGlobe, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

const MyChart = defineAsyncComponent(() => import("components/MyChart.vue"));

export default {
  name: "MyLayout",
  components: {},
  setup() {
    const { localeList, t, locale } = useLang();
    const leftDrawerOpen = ref(false);
    const search = ref("");

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      localeList,
      MyChart,
      t,
      locale,
      biGlobe,
      biCheck,
      biTranslate,
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      links1: [
        { icon: "home", text: "Home", link: "/" },
        { icon: "whatshot", text: "List Page", link: "/list-page" },
        { icon: "subscriptions", text: "Subscriptions" },
        { icon: biTranslate, text: "Translate", link: "/locale-page" },
      ],
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
}
</style>
