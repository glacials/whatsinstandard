module.exports = {
  staticFileGlobs: [],
  runtimeCaching: [{
    urlPattern: /.*/,
    handler: 'networkFirst'
  }]
};
