'use strict';

const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: 'wblog-gatsby'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [autoprefixer()]
      }
    }
  ]
};
