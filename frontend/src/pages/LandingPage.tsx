import React from 'react';
import styles from '../css/LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to My Site</h1>
      </header>
      
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h2>Your Main Message Here</h2>
          <p>A brief description of your site or service</p>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;