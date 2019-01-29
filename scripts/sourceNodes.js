'use strict';

const Promise = require('bluebird');
const url = require('url');
const getPage = require('./getPage');
const cheerio = require('cheerio');

async function getPostList() {
  const html = await getPage('https://wiredcraft.com/blog');
  const $ = cheerio.load(html, { decodeEntities: false });
  const list = [];
  $('#posts li a').map((i, el) => {
    const href = $(el).attr('href');
    let capture;
    capture = /blog\/([\w\d_-]+)\/?$/.exec(href);
    if (!capture) return;

    const slug = capture[1];

    const coverStyle = $(el)
      .find('.cover')
      .attr('style');
    let coverImage = '';
    capture = /url\(['"]?(.*?)['"]?\)/.exec(coverStyle);
    if (capture) {
      coverImage = 'https:' + capture[1];
    }

    const title = $(el)
      .find('.content h3')
      .html();

    list.push({
      href,
      coverImage,
      slug,
      title
    });
  });
  return list;
}

function ensureImageAbsUrl(link, base = 'https://wiredcraft.com') {
  const { hostname } = url.parse(link);
  if (hostname) return link;
  return url.resolve(base, link);
}

async function getPost(p) {
  const html = await getPage(p.href);
  const $ = cheerio.load(html, { decodeEntities: false });
  const $content = $('#content');

  $('#content section.body .right img').map((i, el) => {
    const src = $(el).attr('src');
    let nextSrc = ensureImageAbsUrl(src);
    $(el).attr('src', nextSrc);
  });

  const content = $content.find('section.body .right').html();
  const header = $content.find('header.header .right .right').html();

  // $('#posts li a').map((i, el) => {
  return { content, header, ...p };
}

async function getAllPosts() {
  const postEntries = await getPostList();
  const jobs = [];
  // for (let i = 0; i < 2; i++) {
  for (let i = 0; i < postEntries.length; i++) {
    const p = postEntries[i];
    jobs.push(getPost(p));
  }
  return await Promise.all(jobs);
}

module.exports = async function sourceNodes({
  actions,
  createNodeId,
  createContentDigest
}) {
  const { createNode } = actions;

  const posts = await getAllPosts();
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const node = {
      ...p,
      id: createNodeId(p.slug),
      parent: null,
      children: [],
      internal: {
        type: `BlogPost`,
        contentDigest: createContentDigest(p)
      }
    };
    createNode(node);
  }
};
