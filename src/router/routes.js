const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      if (!to.query.code) {
        const state =
          Math.random().toString(36).substring(2) + Date.now().toString(36);

        window.location.href = process.env.AUTH_LINK + `&state=${state}`;
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
