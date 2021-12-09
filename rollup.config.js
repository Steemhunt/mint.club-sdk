import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import url from "rollup-plugin-url";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      export: "named",
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
      export: "named",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    external(),
    url({ exclude: ["**/*.svg"] }),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    json(),
  ],
};
