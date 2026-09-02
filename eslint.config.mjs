import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // 作品尺寸與比例不固定，原生 img 能維持現有的 object-fit 與大圖檢視行為。
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**"]),
]);
