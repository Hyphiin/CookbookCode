const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/rezepte" },
      {
        path: "/rezepte",
        component: () => import("src/pages/Rezepte/RezepteView.vue"),
      },
      {
        path: "/rezepteDetail/:id",
        component: () => import("src/pages/Rezepte/RezeptInfoView.vue"),
      },
      {
        path: "/list",
        component: () => import("src/pages/ShoppingList/ShoppingListView.vue"),
      },
      {
        path: "/calendar",
        component: () => import("src/pages/Calendar/CalendarView.vue"),
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
