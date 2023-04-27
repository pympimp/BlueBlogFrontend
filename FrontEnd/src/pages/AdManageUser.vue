<template>
  <q-page class="background flex flex-center column">
    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div class="container">
      <div class="row">
        <!-- ส่วนของหัวข้อ  'จัดการรายชื่อผู้ใช้งาน (Manage User)' -->
        <div class="col">
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
        </div>

        <div class="col flex justify-end q-mr-md">
          <!-- ส่วนของเสิร์ชบาร์ -->
          <q-input
            v-model="search"
            filled
            dense
            type="search"
            style="width: 250px"
          >
            <template v-slot:append>
              <q-icon name="search" color="pink" />
            </template>
          </q-input>
        </div>

        <!-- ส่วนของปุ่มเพิ่มผู้ใช้งาน (Add) -->
        <q-btn
          to="adadduser"
          glossy
          color="pink"
          :label="t('Add')"
          style="bottom: -3px; margin-bottom: 5px"
        />
      </div>

      <!-- ส่วนของหัวข้ออย่างเช่น ID Username etc. -->
      <q-scroll-area style="height: 380px">
        <q-markup-table
          style="
            margin-top: 20px;
            border-radius: 10px;
            padding: 5px 0px 10px 0px;
          "
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
            <!-- ถ้าตัวอักษรที่ค้นหาไม่มีข้อมูลตรงกับในฐานข้อมูล -->
            <tr v-if="filteredUserList.length === 0">
              <td colspan="7" style="text-align: center">
                {{ $t("DataNotFound") }}
              </td>
            </tr>
            <!-- มีข้อมูลให้แสดงผล -->
            <tr v-else v-for="(item, index) in filteredUserList" :key="index">
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
                  :to="`/adedituser/edit/${item.id}`"
                  flat
                  color="pink"
                >
                  <q-tooltip> {{ t("edit") }} </q-tooltip></q-btn
                >
                <q-btn
                  @click="onDelete(index)"
                  :icon="biTrash"
                  flat
                  color="pink"
                >
                  <q-tooltip> {{ t("delete") }} </q-tooltip></q-btn
                >
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-scroll-area>
      <!-- ส่วนของรายชื่อสมาชิกไล่ลงไป -->
    </div>
  </q-page>
  <br />
</template>

<script setup>
import { biPencil, biPlus, biTrash } from "@quasar/extras/bootstrap-icons";
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useMeta, useQuasar } from "quasar";
import { useLang } from "src/composables/useLang";
import { useAxios } from "src/composables/useAxios";
import { UserApi } from "src/api/UserApi";

const $q = useQuasar();
const { getUserList, getOne, createUser, updateUser, deleteUser } = UserApi();
const loading = ref(false);
const userList = ref([]);
// สำหรับค้นหา
const search = ref("");

const { t } = useLang();
useMeta({ title: t("userList") });

//onload เมื่อโหลดหน้านี้ ให้ทำคำสั่งเหล่านี้ออโต้
// onMounted(async () => {
//   fetchList();
// });

// const fetchList = async () => {
//   loading.value = true;
//   const response = await getUserList({
//     page: currentPage.value,
//     perPage: recordPerPage.value,
//   });
//   loading.value = false;
//   if (response) {
//     userList.value = response.dataList;
//     totalPage.value = response.appPagination;
//   }

//   console.log("response", response);
// };

// fetch user list from API and update reactive variables
const fetchList = async () => {
  loading.value = true;
  const response = await getUserList({});
  loading.value = false;
  if (response) {
    userList.value = response.dataList;
  }
};

// call fetchList when component mounted
onMounted(() => {
  fetchList();
});

// computed property for filtered user list based on search keyword
const filteredUserList = computed(() => {
  const searchText = search.value.toLowerCase();
  // ค้นหาข้อมูลตาม id,username,email
  return userList.value.filter((user) => {
    return (
      user.id.toString().toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.username.toLowerCase().includes(searchText)
    );
  });
});

const onDelete = (index) => {
  $q.dialog({
    title: t("Qdelete"),
    message: t("Qconfirm"),
    cancel: true,
    ok: {
      label: t("Qok"),
      color: "negative",
    },
    cancel: {
      label: t("Qno"),
      flat: true,
      color: "grey",
    },
  }).onOk(() => {
    $q.notify({
      message: "Success!",
      type: "positive",
    });
    console.log("OK");
    deleteProcess(index);
  });
};

const deleteProcess = async (index) => {
  const item = userList.value[index];
  if (item) {
    const respone = await deleteUser(item.id);
    console.log("deleteUser", respone);
    // refreshData();
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
};

// const refreshData = () => {
//   userList.value = [];
//   currentPage.value = 1;
//   fetchList();
// };
</script>

<style scoped>
.background {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: auto;
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
