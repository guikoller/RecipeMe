import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/plugins/vuex";
import Error404 from "@/views/Error404";
import HomeView from "@/views/HomeView";
import RecipeInfo from "@/views/Recipe/RecipeInfo";
import RecipeList from "@/views/Recipe/RecipeList";
import Login from "@/views/Login";
import RecipeCreate from "@/views/Recipe/RecipeCreate";
import CategoryList from "@/views/Category/CategoryList";
import CategoryCreate from "@/views/Category/CategoryCreate";
import IngredientList from "@/views/Ingredient/IngredientList";
import IngredientCreate from "@/views/Ingredient/IngredientCreate";
import RegisterPage from "@/views/RegisterPage";
import InventoryList from "@/views/Inventory/InventoryList";
import InventoryCreate from "@/views/Inventory/InventoryCreate";

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HomeView, name: "Home", meta: { pageTitle: "Home" } },
    { path: '/login', component: Login, name: "Login", meta: { pageTitle: "Login" } },
    { path: '/cadastro', component: RegisterPage, name: "Register", meta: { pageTitle: "Cadastro" }},
    // Categorias
    { path: '/categorias', component: CategoryList, name: "CategoryList", meta: { auth: true, pageTitle: "Categorias" } },
    { path: '/categorias/criar', component: CategoryCreate, name: "CategoryCreate", meta: { auth: true, pageTitle: "Criar nova categoria"} },
    // Estoque
    { path: '/estoque', component: InventoryList, name: "InventoryList", meta: { auth: true, pageTitle: "Estoque" } },
    { path: '/estoque/adicionar', component: InventoryCreate, name: "InventoryCreate", meta: { auth: true, pageTitle: "Adicionar item ao estoque"} },
    // Ingredientes
    { path: '/ingredientes', component: IngredientList, name: "IngredientList", meta: { auth: true, pageTitle: "Ingredientes" } },
    { path: '/ingredientes/criar', component: IngredientCreate, name: "IngredientCreate", meta: { auth: true, pageTitle: "Criar novo ingrediente"} },
    // Receitas
    { path: '/receitas', component: RecipeList, name: "RecipeList", meta: { pageTitle: "Receitas" } },
    { path: '/receita/:id', component: RecipeInfo, name: "RecipeInfo", props: true, meta: { pageTitle: "Carregando receita"} },
    { path: '/receitas/criar', component: RecipeCreate, name: "RecipeCreate", meta: { auth: true, pageTitle: "Criar nova receita"} },
    // Redirecionamento
    { path: '/404', component: Error404, name: "404", meta: { pageTitle: "Página não encontrada"} },
    { path: '*', redirect: {name: "404"} }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach( (to, from, next) => {
    if (to.meta.auth && !store.state.token)
        return next({name: "Login"})
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