import React from 'react';
import { graphql } from 'gatsby';
import PostList from '../components/PostList';

import Layout from '../components/Layout';
import TitleAndMetaTags from '../components/TitleAndMetaTags';
import createOgUrl from '../utils/createOgUrl';
import '../utils/reset.scss';

export default ({ data }) => {
  return (
    <Layout>
      <TitleAndMetaTags
        title={'Posts - Wiredcraft Blog'}
        ogUrl={createOgUrl()}
      />
      <PostList edges={data.allBlogPost.edges} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostsIndexQuery {
    allBlogPost(limit: 1000) {
      edges {
        node {
          content
          header
          coverImage
          title
          slug
          href
        }
      }
    }
  }
`;
