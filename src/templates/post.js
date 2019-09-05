import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import AuthorCard from '../components/AuthorCard';

import cl from './post.module.css';

const urlPrefix = 'https://wiredcraft.com';

export default function Post({ data }) {
  const { blogPost } = data;
  const { image, content, authorData } = blogPost;

  return (
    <Layout>
      <div className={cl.contentContainer}>
        <div className={cl.right}>
          <h1 className={cl.title}>{blogPost.title}</h1>
          <p>{blogPost.description}</p>
        </div>
        {image ? (
          <div
            className={cl.cover}
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : null}
        <div className={cl.postContainer}>
          <div>
            <aside>
              <div className="tbt tbb">
                <AuthorCard urlPrefix={urlPrefix} {...authorData} />
              </div>
            </aside>
          </div>
          <div
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: content }}
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
      authorData {
        url
        position
        name
      }
      description
      image
      header
      title
      slug
      href
    }
  }
`;

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//       }
//     }
// `;
