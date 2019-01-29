import React from 'react';
import Helmet from 'react-helmet';

const TitleAndMetaTags = ({ title, ogUrl }) => {
  return (
    <Helmet title={title}>
      <link
        rel="icon"
        type="image/png"
        href="https://wiredcraft.com/assets/favicons/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://wiredcraft.com/assets/favicons/favicon-16x16.png"
        sizes="16x16"
      />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta
        property="og:image"
        content="https://wiredcraft.com/assets/social/tech.jpg"
      />
      <meta property="og:description" content="Wiredcraft Blog" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default TitleAndMetaTags;
// <link href="https://wiredcraft.com/assets/styles.css" rel="stylesheet" />
