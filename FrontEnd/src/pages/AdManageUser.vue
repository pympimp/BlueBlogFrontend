<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div class="container">
      <!-- ส่วนของหัวข้อ  'จัดการรายชื่อผู้ใช้งาน (Manage User)' -->
      <p
        style="
          font-size: 25px;
          font-weight: bolder;
          margin-left: 20px;
          margin-bottom: -10px;
          position: absolute;
          color: #880e4f;
        "
      >
        {{ t("ManageUser") }}
      </p>
      <!-- ส่วนของเสิร์ชบาร์ -->
      <q-input
        v-model="search"
        filled
        dense
        type="search"
        style="width: 250px; position: absolute; right: 430px"
      >
        <template v-slot:append>
          <q-icon name="search" color="pink" />
        </template>
      </q-input>

      <!-- ส่วนของปุ่มเพิ่มผู้ใช้งาน (Add) -->
      <q-btn
        to="adadduser"
        glossy
        color="pink"
        :label="t('Add')"
        style="bottom: -3px; left: 645px; margin-bottom: 5px"
      />

      <!-- ส่วนของหัวข้ออย่างเช่น ID Username etc. -->

      <q-markup-table
        style="margin-top: 20px; border-radius: 10px; padding: 5px 0px 10px 0px"
      >
        <thead>
          <tr style="font-weight: bold">
            <th class="text-center">{{ t("Profile") }}</th>
            <th class="text-center">{{ t("Id") }}</th>
            <th class="text-center">{{ t("Username") }}</th>
            <th class="text-center">{{ t("Email") }}</th>
            <th class="text-center">{{ t("Type") }}</th>
            <th class="text-center">{{ t("Status") }}</th>
            <th class="text-center">{{ t("Tools") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in userList" :key="index">
            <td class="text-center">
              <q-avatar size="35px" rounded v-if="item.picture">
                <img :src="item.picture.x" />
              </q-avatar>
            </td>
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.username }}</td>
            <td class="text-center">{{ item.email }}</td>
            <td class="text-center">{{ item.userRoles }}</td>
            <td class="text-center">{{ item.status }}</td>
            <td>
              <q-btn
                :icon="biPencil"
                :to="'/adedituser/' + item.id"
                flat
                color="pink"
              >
                <q-tooltip> {{ t("edit") }} </q-tooltip></q-btn
              >
              <q-btn :icon="biTrash" flat color="pink">
                <q-tooltip> {{ t("delete") }} </q-tooltip></q-btn
              >
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <br />
      <div class="q-gutter-md" style="display: flex; justify-content: center">
        <q-pagination
          v-model="currentPage"
          :max="totalPage"
          direction-links
          flat
          color="grey"
          active-color="pink"
        />
      </div>

      <!-- ส่วนของรายชื่อสมาชิกไล่ลงไป -->
    </div>
  </q-page>
  <br />
</template>

<script setup>
import { biPencil, biPlus, biTrash } from "@quasar/extras/bootstrap-icons";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useMeta } from "quasar";
import { useLang } from "src/composables/useLang";
import { useAxios } from "src/composables/useAxios";
import { UserApi } from "src/api/UserApi";
const { getUserList } = UserApi();

const loading = ref(false);
const currentPage = ref(1);
const recordPerPage = ref(6);
const totalPage = ref(0);
const userList = ref([]);

const { t } = useLang();
useMeta({ title: t("userList") });

//onload เมื่อโหลดหน้านี้ ให้ทำคำสั่งเหล่านี้ออโต้
onMounted(async () => {
  fetchList();
});

const fetchList = async () => {
  loading.value = true;
  const response = await getUserList({
    page: currentPage.value,
    perPage: recordPerPage.value,
  });
  loading.value = false;
  if (response) {
    userList.value = response.dataList;
    totalPage.value = response.appPagination;
  }

  console.log("response", response);
};

watch(currentPage, async (newVal, oldVal) => {
  fetchList();
  console.log("currentPage changed :", newVal);
});
</script>

<style scoped>
.flex {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: 100%;
  height: auto;
}

.flex .container {
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  width: 800px;
  padding: 20px 20px 20px 20px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background: white;
}

/* set up รูปโปรไฟล์ */
</style>
