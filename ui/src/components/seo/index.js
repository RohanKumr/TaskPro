// components/DynamicSEO.js
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import seoConfig from '../../utils/seoConfig';

const SEO = () => {
  const { pathname } = useLocation();
  const seo = seoConfig[pathname] || {
    title: "TaskPro | Smart Task Management",
    description: "Efficient task management for admins and employees.",
  };

  return (
    <Helmet>
      <title>{ seo.title }</title>
      <meta name="description" content={ seo.description } />

      <title>{ seo.title }</title>
      <meta name="description" content={ seo.description } />
      <meta property="og:title" content={ seo.title } />
      <meta property="og:description" content={ seo.description } />
      <meta property="og:type" content="taskpro.com" />
      <meta name="twitter:card" content="image_comp" />
    </Helmet>
  );
};

export default SEO;
