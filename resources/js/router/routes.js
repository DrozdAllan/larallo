const routes = [
    {
        path: "/",
        component: () => import("../views/HomeView.vue"),
        name: "home",
    },
    {
        path: "/example",
        component: () => import("../views/ExampleView.vue"),
        name: "example",
    },
    {
        path: "/rien",
        component: () => import("../views/RienView.vue"),
        name: "rien",
    },
];

export default routes;
