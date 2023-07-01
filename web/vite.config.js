import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()],
  preview: {
    open: true,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
}
