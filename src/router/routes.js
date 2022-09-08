const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      if (!to.query.code) {
        window.location.href = process.env.AUTH_LINK;
      } else {
        next();
      }
    },
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "oauth/redirect",
        component: () => import("pages/IndexPage.vue"),
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
