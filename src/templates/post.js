import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import TitleAndMetaTags from '../components/TitleAndMetaTags';

import createOgUrl from '../utils/createOgUrl';

import style from './post.module.scss';

export default function Post({ data }) {
  const { blogPost } = data;
  return (
    <Layout>
      <TitleAndMetaTags
        title={'Posts - Wiredcraft Blog'}
        ogUrl={createOgUrl(blogPost.slug)}
      />
      <div className={style.root}>
        <div
          itemProp="articleHeader"
          dangerouslySetInnerHTML={{ __html: blogPost.header }}
        />
        <div className={style.content}>
          <div
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      content
      header
      title
      slug
      href
    }
  }
`;
