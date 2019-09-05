import React from 'react';

import cl from './AuthorCard.module.css';

export default function Author({ urlPrefix, name, position, url }) {
  const imgUrl = urlPrefix + url;
  return (
    <div className={cl.wrap}>
      <img
        className={cl.avatar}
        src={imgUrl}
        alt={'Avatar of the author: ' + name}
      />
      <div>
        <strong>{name}</strong>
        <div>{position}</div>
      </div>
    </div>
  );
}
