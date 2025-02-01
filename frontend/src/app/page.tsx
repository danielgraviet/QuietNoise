import styles from '../css/page.module.css';
import Image from 'next/image';
import FeaturedArticle from '../pages/FeaturedArticle';

export default function Home() {
  return (
    <div className={styles.container}>
      <FeaturedArticle />
      {/* Blog Section */}
      <section className={styles.blogSection}>
        <h2>Blog</h2>
        <p className={styles.blogDescription}>
          Here, we share travel tips, destination guides, and stories that inspire your next adventure.
        </p>

        <div className={styles.categories}>
          <button className={styles.active}>All</button>
          <button>Destination</button>
          <button>Culinary</button>
          <button>Lifestyle</button>
          <button>Tips & Hacks</button>

          <div className={styles.sortBy}>
            <span>Sort by:</span>
            <select defaultValue="newest">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
