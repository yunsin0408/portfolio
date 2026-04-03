import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import ExtracurricularView from "../views/ExtracurricularView.vue";
import CvView from "../views/CvView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/extracurricular", name: "extracurricular", component: ExtracurricularView },
    { path: "/cv", name: "cv", component: CvView },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
