import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify'; 


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
