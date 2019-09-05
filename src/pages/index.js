import React from 'react';
import { graphql } from 'gatsby';
import PostList from '../components/PostList';

import Layout from '../components/Layout';
import TitleAndMetaTags from '../components/TitleAndMetaTags';
import createOgUrl from '../utils/createOgUrl';
import '../utils/reset.css';

function Index({ data }) {
  return (
    <Layout>
      <TitleAndMetaTags
        title={'Posts - Wiredcraft Blog'}
        ogUrl={createOgUrl()}
      />
      <PostList edges={data.allBlogPost.edges} />
    </Layout>
  );
}

export default Index;

export const pageQuery = graphql`
  query BlogPostsIndexQuery {
    allBlogPost(limit: 1000) {
      edges {
        node {
          title
          date
          authorData {
            url
            position
            name
          }
          content
          header
          image
          slug
          href
        }
      }
    }
  }
`;
