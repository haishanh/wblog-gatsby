'use strict';

const debug = require('debug')('www');
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs-extra');
const sourceNodes = require('./scripts/sourceNodes');

exports.sourceNodes = sourceNodes;

const allPosts = `{
allBlogPost (
  limit: 1000
) {
    edges {
      node {
        content
        header
        title
        slug
        href
      }
    }
  }
}`;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(allPosts).then(result => {
    let edges;
    try {
      edges = result.data.allBlogPost.edges;
    } catch (e) {
      throw new Error('error with markdown GraphQL data source');
    }
    const component = path.resolve('./src/templates/post.js');
    return Promise.map(edges, ({ node }) => {
      const { slug } = node;
      createPage({
        path: slug,
        component,
        context: { slug }
      });
    });
  });
};

exports.onPostBuild = () => {
  fs.copySync(
    path.join(__dirname, '/src/locales'),
    path.join(__dirname, '/public/locales')
  );
};
