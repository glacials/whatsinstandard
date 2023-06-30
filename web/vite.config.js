import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
}
