import Link from 'next/link';
import styles from '../css/NavBar.module.css';
import Image from 'next/image';


const NavBar = () => {
    return (
        <nav className={styles.navContainer}>
            {/* Logo */}
            <div className={styles.leftSection}>
                <div className={styles.navLogo}>
                    <h2><Link href="/">Legal Byte</Link></h2>
                </div>

                {/* Links */}
                <ul className={styles.navLinks}>
                    <li><Link href="/">Tools</Link></li>
                    <li><Link href="/">Bites</Link></li>
                    <li><Link href="/">IP</Link></li>
                </ul>
            </div>

            <div className={styles.rightSection}>
                {/* Search Bar */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className={styles.searchInput}
                    />
                    <button className={styles.searchButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>

                {/* Language and Auth Buttons */}
                <button className={styles.langButton}>
                    <Image src="/icons/globe.png" alt="Language" width={25} height={25} />
                    <div className={styles.langText}>EN</div>
                </button>
                <Link className={styles.loginButton} href="/about">About</Link>
                <Link className={styles.signupButton} href="/login">Log In</Link>
            </div>
        </nav>
    );
};

export default NavBar;