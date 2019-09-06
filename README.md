**Note** this repo is public, but the content source repo isn't.

## Development

```bash
# clone this repo
https://github.com/haishanh/wblog-gatsby.git

# change directory
cd wblog-gatsby

# fetch the content repo
# sorry, it's a private repo
git clone git@github.com:Wiredcraft/marketing.git --depth 1

# install deps
yarn

# development
yarn start

# generate production build
# content generated to the "public" directory
# remove source maps before publish if you care about it
yarn build
```
