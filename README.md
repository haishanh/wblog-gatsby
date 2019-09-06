## Development

```bash
# fetch the content repo
# sorry, currently it requires the dir's name to be `marketing`
git clone git@github.com:org-foo/repo-bar.git marketing --depth 1

# install deps
yarn

# development
yarn start

# generate production build
# content generated to the "public" directory
# remove source maps before publish if you care about it
yarn build
```
