'use client';

import Link from 'next/link';
import styles from '@/css/Navigation.module.css';

export default function Navigation() {
    return (
        <nav className={`${styles.nav} w-full`}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {/* Left section - Logo */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>QuietNoise</span>
                    </Link>

                    {/* Middle section - Navigation links */}
                    <div className={styles.links}>
                        <Link href="/tech" className={styles.link}>Tech</Link>
                        <Link href="/tips" className={styles.link}>Tips</Link>
                        <Link href="/talks" className={styles.link}>Talks</Link>
                    </div>

                    {/* Right section - Search and buttons */}
                    <div className={styles.rightSection}>
                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className={styles.searchInput}
                            />
                        </div>
                        <button className={styles.button}>EN</button>
                        <button className={styles.button}>Log In</button>
                        <button className={styles.signUpButton}>Sign Up</button>
                    </div>
                </div>
            </div>
        </nav>
    );
} 