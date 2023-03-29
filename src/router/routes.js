const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/login", component: () => import("pages/LogIn.vue") },
      {
        path: "/addpost",
        component: () => import("src/pages/AddPost.vue"),
      },
      { path: "/mainpage", component: () => import("pages/MainPage.vue") },
      { path: "/signup", component: () => import("pages/SignUp.vue") },
      {
        path: "/myprofile",
        component: () => import("src/pages/MyProfile.vue"),
      },
      {
        path: "/manageprofile",
        component: () => import("src/pages/ManageProfile.vue"),
      },
      { path: "/setting", component: () => import("pages/SettinG.vue") },
      {
        path: "/manageprofile",
        component: () => import("src/pages/ManageProfile.vue"),
      },
      { path: "/setting", component: () => import("pages/SettinG.vue") },
      {
        path: "/postncomment",
        component: () => import("pages/PostnComment.vue"),
      },

      {
        path: "/addashboard",
        component: () => import("src/pages/AdDashboard.vue"),
      },
      {
        path: "/admanageuser",
        component: () => import("src/pages/AdManageUser.vue"),
      },
      {
        path: "/adedituser/:userId",
        component: () => import("src/pages/AdEditUser.vue"),
      },
      {
        path: "/adadduser",
        component: () => import("src/pages/AdAddUser.vue"),
      },
      {
        path: "/adprofile",
        component: () => import("src/pages/AdProfile.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
