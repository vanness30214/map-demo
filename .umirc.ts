import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
  ],
  mfsu:false,
  npmClient: 'pnpm',
});
