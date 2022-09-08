import { Cookies } from "quasar";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      if (!to.query.code && to.query.state) {
        Cookies.set("state", to.query.state, { expires: "15m" });
        Cookies.set("redirect_uri", to.query.redirect_uri, { expires: "15m" });
        window.location.href =
          process.env.AUTH_LINK + `&state=${to.query.state}`;
      } else {
        let state = Cookies.get("state");
        let redirect_uri = Cookies.get("redirect_uri");
        Cookies.remove("state");
        Cookies.remove("redirect_uri");
        if (to.query.state === state && redirect_uri) {
          window.location.href =
            redirect_uri +
            `?state=${to.query.state}` +
            `&code=${to.query.code}`;
        } else {
          next();
        }
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
