const routes = [
    {
        path: "/example",
        component: () => import("../components/ExampleComponent.vue"),
        name: "example",
    },
    {
        path: "/rien",
        component: () => import("../components/RienComponent.vue"),
        name: "rien",
    },
];

export default routes;
