import React from 'react';
import { FiTwitter, FiGithub } from 'react-icons/fi';
import s from './Footer.module.css';

export default () => (
  <footer className={s.footer}>
    <div className={s.copyright}>
      <small>Some Footer Here</small>
    </div>
    <div className={s.social}>
      <a className={s.twitter} href="https://twitter.com/wiredcraft">
        <FiTwitter />
      </a>
      <a className={s.github} href="https://github.com/wiredcraft">
        <FiGithub />
      </a>
    </div>
  </footer>
);
