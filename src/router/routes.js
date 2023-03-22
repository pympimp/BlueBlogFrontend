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
      {
        path: "/postncomment",
        component: () => import("pages/PostnComment.vue"),
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
