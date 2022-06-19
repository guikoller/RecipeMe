import Vue from 'vue'
import VueRouter from 'vue-router'
import Error404 from "@/views/Error404";
import HomeView from "@/views/HomeView";
import RecipeInfo from "@/views/Recipe/RecipeInfo";
import RecipeList from "@/views/Recipe/RecipeList";
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HomeView, name: "Home", meta: { pageTitle: "Home" } },
    { path: '/login', component: Login, name: "Login", meta: { pageTitle: "Login" } },
    { path: '/receitas', component: RecipeList, name: "RecipeList", meta: { pageTitle: "Receitas" } },
    { path: '/receitas/:id', component: RecipeInfo, name: "RecipeInfo", props: true, meta: { pageTitle: "Receita"} },
    { path: '/404', component: Error404, name: "404", meta: { pageTitle: "Página não encontrada"} },
    { path: '*', redirect: {name: "404"} }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach( (to, from, next) => {
    if (to.meta.auth)
        return next({name: "Home"})
    next();
});

router.afterEach((to) => {
    document.title = "RecipeMe | " + to.meta.pageTitle ?? "404";
    if (!to.meta.noScrollReset) {
        window.scrollTo(0,0);
    }
});

// router.redirect({
//     '*': 'Home'
// })

export default router