const routes = [
  {
    path: "/",
    meta: { requireAuth: true },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/myfeed", component: () => import("pages/MyFeed.vue") },
      {
        path: "/addpost",
        component: () => import("src/pages/AddPost.vue"),
      },
      { path: "/mainpage", component: () => import("pages/MainPage.vue") },
      {
        path: "/myprofile/:user_id",
        component: () => import("src/pages/MyProfile.vue"),
      },
      {
        path: "/manageprofile/:userId",
        component: () => import("src/pages/ManageProfile.vue"),
      },
      { path: "/setting", component: () => import("pages/SettinG.vue") },
      { path: "/setting", component: () => import("pages/SettinG.vue") },
      {
        path: "/postncomment/:postId",
        component: () => import("pages/PostnComment.vue"),
      },

      {
        path: "/editpost/:postId",
        component: () => import("src/pages/EditPost.vue"),
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
        path: "/adedituser/:action/:userId",
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

      {
        path: "/managelist",
        component: () => import("src/pages/ManageList.vue"),
      },

      {
        path: "/login2",
        component: () => import("src/pages/LogIn.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      { path: "login", component: () => import("src/pages/LogIn.vue") },
      { path: "signup", component: () => import("pages/SignUp.vue") },
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
