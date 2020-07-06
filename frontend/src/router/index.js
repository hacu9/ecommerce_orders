import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "orders",
        // meta: { auth: true },
        component: () => import("../views/orders/Index.vue")
    },
    {
        path: "/orders/:id",
        name: "orders_show",
        // meta: { auth: true },
        component: () => import("../views/orders/Show.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;
