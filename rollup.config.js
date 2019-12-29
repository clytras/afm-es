

const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify'); 


export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
