// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "Index",
        redirect: "/home",
        component: () => import("@/views/index.vue"),
        children: [
          {
            path: "/home",
            name: "Home",
            component: () => import("@/components/index/home/home.vue"),
          },
          {
            path: "/aboutus",
            name: "AboutUs",
            component: () => import("@/components/index/aboutUs/aboutUs.vue"),
          },
        ],
      },
      {
        path: "/auth",
        name: "Auth",
        component: () => import("@/views/auth.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userId = localStorage.getItem("id");

  if (to.name === "Auth" && userId) {
    next({ name: "Home" });
  } else if (to.name === "Home" && !userId) {
    next({ name: "Auth" });
  } else {
    next();
  }
});

export default router;
