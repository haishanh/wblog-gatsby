'use strict';

module.exports = {
  // siteMetadata: {
  //   title: 'wblog-gatsby'
  // },
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('postcss-import')(),
          require('postcss-nested')(),
          require('autoprefixer')()
        ]
      }
    },
    // make sure to put the netlify one at the last of the array
    'gatsby-plugin-netlify'
  ]
};
