const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/login", component: () => import("pages/LogIn.vue") },
      { path: "/addpost", component: () => import("pages/AddPost.vue") },
      { path: "/mainpage", component: () => import("pages/MainPage.vue") },
      { path: "/signup", component: () => import("pages/SignUp.vue") },
      { path: "/myprofile", component: () => import("pages/MyProfile.vue") },
      {
        path: "/manageprofile",
        component: () => import("pages/ManageProfile.vue"),
      },
      { path: "/setting", component: () => import("pages/SettinG.vue") },
      {
        path: "/manageprofile",
        component: () => import("pages/ManageProfile.vue"),
      },
      { path: "/setting", component: () => import("pages/SettinG.vue") },
      {
        path: "/postncomment",
        component: () => import("pages/PostnComment.vue"),
      },

      {
        path: "/addashboard",
        component: () => import("pages/AdDashboard.vue"),
      },
      {
        path: "/admanageuser",
        component: () => import("pages/AdManageUser.vue"),
      },
      {
        path: "/adedituser",
        component: () => import("pages/AdEditUser.vue"),
      },
      {
        path: "/adadduser",
        component: () => import("pages/AdAddUser.vue"),
      },
      {
        path: "/adprofile",
        component: () => import("pages/AdProfile.vue"),
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
