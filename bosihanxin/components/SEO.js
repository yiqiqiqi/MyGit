import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * SEO组件用于管理页面的元标签
 * @param {Object} props
 * @param {string} props.title - 页面标题
 * @param {string} props.description - 页面描述
 * @param {string} props.keywords - 页面关键词（逗号分隔）
 * @param {string} props.ogType - Open Graph类型 (website, article等)
 * @param {string} props.ogImage - Open Graph图片URL
 * @param {Object} props.additionalMetaTags - 其他元标签
 */
const SEO = ({
  title = '企业网站',
  description = '我们是专业的企业解决方案提供商，为您提供全方位的服务',
  keywords = '企业,解决方案,服务',
  ogType = 'website',
  ogImage = '/og-image.jpg',
  additionalMetaTags = [],
}) => {
  const router = useRouter();
  const canonicalUrl = `https://your-domain.com${router.asPath}`;
  
  return (
    <Head>
      {/* 基本元标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 移动设备优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* 其他自定义元标签 */}
      {additionalMetaTags.map(({ name, content, property }, i) => (
        property ? 
          <meta key={`meta-prop-${i}`} property={property} content={content} /> : 
          <meta key={`meta-name-${i}`} name={name} content={content} />
      ))}
    </Head>
  );
};

export default SEO; 