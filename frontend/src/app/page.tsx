import styles from '../css/page.module.css';
import FeaturedArticle from '../pages/FeaturedArticle';
import BlogGrid from '../pages/BlogGrid';

export default function Home() {
  return (
    <div className={styles.container}>
      <FeaturedArticle />
      <BlogGrid />
    </div>
  );
}
