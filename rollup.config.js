import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
            exports: "named",
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
            exports: "named",
        },
    ],
    plugins: [
        resolve({
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        }),
        commonjs(),
        babel({
            presets: ["@babel/preset-react"],
            babelHelpers: "bundled",
        }),
        postcss({
            extract: true,
            minimize: true,
        }),
    ],
    external: ["react", "react-dom"],
};
