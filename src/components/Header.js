import React from 'react';
import { Link } from 'gatsby';
import Logo from './Logo';

import s from './Header.module.css';

export default function Header() {
  return (
    <header className={s.header} style={{ padding: 30, textAlign: 'left' }}>
      <Link to="/">
        <Logo height={24} />
      </Link>
    </header>
  );
}
