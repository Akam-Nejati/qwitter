import type { App } from "vue";
import { createPinia } from "pinia";

export function pinia(app: App) {
  const pinia = createPinia();

  app.use(pinia);
}
