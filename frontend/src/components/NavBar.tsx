import Link from 'next/link';
import styles from '../css/NavBar.module.css'
import Image from 'next/image';
import SearchBar from './SearchBar';

const NavBar = () => {
    console.log("NavBar styles object:", styles); //
    return (
        <nav className={styles.navContainer}>
            <div className={styles.leftSection}>
                <div className={styles.navLogo}>
                    <h2><Link href="/">Legal Byte</Link></h2>
                </div>
                <ul className={styles.navLinks}>
                    <li><Link href="/">Tools</Link></li>
                    <li><Link href="/">Bites</Link></li>
                    <li><Link href="/">IP</Link></li>
                </ul>
            </div>

            <div className={styles.rightSection}>
                {/* Isolated Search Component */}
                <SearchBar />

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