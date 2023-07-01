import vue from '@vitejs/plugin-vue'

export default {
  optimizeDeps: {
    disabled: true, // Disabled to avoid macOS Safari error `Failed to load resource: the server responded with a status of 504 (Outdated Optimize Dep)`
  },
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
