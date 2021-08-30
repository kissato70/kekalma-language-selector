import cleaner from "rollup-plugin-cleaner";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import node_resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import serve from "rollup-plugin-serve";
import livereload from 'rollup-plugin-livereload';

export default {
  input: "src/language-selector.tsx",
  output: [
    {
      file: "dist/language-selector.js",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    cleaner({
      targets: ["./dist/"]
    }),
    peerDepsExternal(),
    node_resolve(),
    
    typescript({
      tsconfig: "tsconfig.dev.json"
    }),
    postcss({ plugins: [] }),
    json(),
    
    
    livereload({
      watch: 'src',
      verbose: true,
      delay: 1500
    })
  ],
};
