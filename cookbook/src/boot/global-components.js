import { boot } from "quasar/wrappers";

const globalComponents = {
  "page-view": require("components/Page/PageView").default,
  "page-header": require("components/Page/PageHeader").default,
  "page-header-btn-back": require("components/Page/PageHeaderBtnBack").default,
  "page-body": require("components/Page/PageBody").default,
};

export default boot(async ({ app }) => {
  for (const key in globalComponents) {
    app.component(key, globalComponents[key]);
  }
});
