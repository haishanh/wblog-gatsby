import React from 'react';
import { Link } from 'gatsby';
import dayjs from 'dayjs';
import cl from './PostList.module.css';

export default function PostList({ edges }) {
  return (
    <main role="main">
      <ul className={cl.list}>
        {edges.map(e => {
          const { node } = e;
          const { slug, title, image, authorData, date } = node;
          const t = dayjs(date).format('MMMM D, YYYY');
          // console.log(date);
          const url = `/${slug}`;
          return (
            <li key={slug}>
              <Link to={url}>
                <div className={cl.thumbnailWrap}>
                  {image ? (
                    <img
                      src={`http://107.170.228.163:8080/wiredcraft.com/fill/288/288/ce/0/plain/${image}`}
                    />
                  ) : null}
                </div>
                <div>
                  <h3>{title}</h3>
                  <div className={cl.meta}>
                    {'By '}
                    {authorData.name}
                    {' on '}
                    <time>{t}</time>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
