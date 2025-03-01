import styles from '../../css/about.module.css';
import Image from 'next/image';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1>About Me</h1>
        <p className={styles.subtitle}>I try to write articles that are helpful and informative.</p>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/about-hero.jpg"
            alt="About Us"
            fill
            priority
            className={styles.aboutImage}
          />
        </div>

        <div className={styles.textContent}>
          <h2>My Story</h2>
          <p>
            My name is Daniel Thi Graviet. I am from Boise, Idaho and am currently studying Computer Science at Brigham Young University. 
            I enjoy builidng websites and learning new things. 
            I try to keep things as simple as possible, and have found that helps me learn the most. 
            That is what inspired me to create this blog. 
            QuietNoise is meant to drown out all the extra `&quot;`noise`&quot;` in the world, and help readers find information that is truly important, make significant changes, and grow into the best version of themselves.
          </p>

          <h2>My Goal</h2>
          <p>
            I will publish one article each week that teaches aspiring developers, engineers, and students practical skills.
          </p>

          <h2>Meet the Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <Image
                src="/images/headshot.png"
                alt="Team Member"
                width={120}
                height={120}
                className={styles.teamImage}
              />
              <h3>Daniel Thi Graviet</h3>
              <p>Founder & Editor</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
      </section>
    </div>
  );
}