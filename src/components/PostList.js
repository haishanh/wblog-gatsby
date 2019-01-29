import React from 'react';
import { Link } from 'gatsby';
import style from './PostList.module.scss';

export default function PostList({ edges }) {
  return (
    <main role="main">
      <ul className={style.list}>
        {edges.map(e => {
          const { node } = e;
          const { slug, title, coverImage } = node;
          const url = `/${slug}`;
          return (
            <li
              key={slug}
              style={{
                backgroundImage: `url(${coverImage})`
              }}>
              <div className={style.header}>
                <h2>
                  <Link to={url}>{title}</Link>
                </h2>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
