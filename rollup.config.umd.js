

const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify'); 


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/lytrax-afm.js',
    sourcemap: true,
    format: 'umd',
    name: 'LytraxAFM'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    minify({
      comments: false
    })
  ]
}
