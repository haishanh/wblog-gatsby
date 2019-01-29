import React from 'react';
import { Link } from 'gatsby';

import s from './Header.module.scss';

export default function Header() {
  return (
    <header className={s.header} style={{ padding: 30, textAlign: 'right' }}>
      <Link to="/">
        <h1>Blog</h1>
      </Link>
    </header>
  );
}
