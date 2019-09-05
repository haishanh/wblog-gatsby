'use strict';

const debug = require('debug')('www:scripts:sourceNodes');

const fs = require('fs');
const util = require('util');
const path = require('path');
const yaml = require('js-yaml');

const Promise = require('bluebird');
const remark = require('remark');
const html = require('remark-html');

const contentDir = 'marketing';

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const remarkProcess = remark().use(html).process;
const renderMd = util.promisify(remarkProcess);

function ensureImageAbsUrl(input, base = 'https://wiredcraft.com') {
  const newString = input.replace(
    /(\/images\/[\s\S]+?\.(jpg|png|jpeg|gif))/g,
    (_, p1) => {
      return base + p1;
    }
  );
  return newString;
}

function matter(s) {
  let cap = /^[\s]*?([-]{3,5})?([\s\S]*?)[-]{3,5}([\s\S]*)$/.exec(s);
  let data = {};
  if (cap[2]) {
    try {
      // json: true allows duplicate keys
      data = yaml.load(cap[2], { json: true });
    } catch (err) {
      // ignore
      throw err;
    }
  }
  return {
    data,
    content: cap[3]
  };
}

function splitDateName(str) {
  let cap = /^(([\d]{4}-[\d]{2}-[\d]{2})-)?([\S\s]*)$/.exec(str);
  return {
    date: cap[2],
    slug: cap[3]
  };
}

async function readAndRender(f) {
  let s = await readFile(f, 'utf8');
  s = ensureImageAbsUrl(s);

  const { name } = path.parse(f);
  const { date, slug } = splitDateName(name);

  let o;
  try {
    o = matter(s);
  } catch (err) {
    debug('reading %s', f);
    console.log(err);
  }
  // debug('fm %o', o.data);
  const h = await renderMd(o.content);
  return {
    content: String(h),
    slug,
    href: '/',
    header: 'dd',
    date,
    ...o.data
  };
}

const postsDir = path.resolve(contentDir, '_posts');
async function getPostList() {
  const files = await readdir(postsDir);
  const filesSorted = files.sort((a, b) => {
    if (b > a) {
      return 1;
    }
    return -1;
  });
  const jobs = [];
  for (let i = 0; i < 30; i++) {
    const f = filesSorted[i];

    // TODO
    if (f === 'fr') continue;

    // const f = '2019-09-04-creating-an-interactive-report-with-google-data-studio.md';
    const absf = path.resolve(postsDir, f);
    jobs.push(readAndRender(absf));
  }
  return await Promise.all(jobs);
}

const dataDir = path.resolve(contentDir, '_data');
async function readTeam() {
  const c = await readFile(path.resolve(dataDir, 'team.yml'), 'utf8');
  const team = yaml.safeLoad(c);
  const people = {};
  for (let i = 0; i < team.length; i++) {
    const p = team[i];
    people[p.user] = {
      // user string <- id
      // name string
      // position string
      ...p,
      url: `/images/team/${p.user}.jpg`
    };
  }
  return people;
}

module.exports = async function sourceNodes({
  actions,
  createNodeId,
  createContentDigest
}) {
  const { createNode } = actions;
  const posts = await getPostList();
  const people = await readTeam();
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const authorData = people[p.author];
    // FIXME
    if (!p.description) p.description = '';
    const node = {
      ...p,
      id: createNodeId(p.slug),
      authorData,
      parent: null,
      children: [],
      internal: {
        type: 'BlogPost',
        contentDigest: createContentDigest(p)
      }
    };
    createNode(node);
  }
};
