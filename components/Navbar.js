import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function Navbar(props) {
    const { user, logout } = useContext(AuthContext);

    const current = props.current;
    return (
        <nav id={styles.navbar}>
            <Link href="/">
                <a className={styles.logo}>EL</a>
            </Link>
            <ul className={styles.options}>
                <li>
                    <Link href="/">
                        <a className="current">HOME</a>
                    </Link>
                </li>
                <li>
                    <Link href="/courses">
                        <a className={current == "courses" ? "current" : ""}>
                            COURSES
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/news">
                        <a className={current == "courses" ? "current" : ""}>
                            NEWS
                        </a>
                    </Link>
                </li>
                {user ? (
                    <>
                        <Link href="/account/dashboard" passHref={true}>
                            <button className="btn btn-smol btn-blue">
                                <i className="fas fa-user-circle"></i>
                            </button>
                        </Link>

                        <button
                            onClick={() => logout()}
                            className="btn btn-smol btn-red"
                        >
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/account/signup" passHref={true}>
                                <button className="btn btn-primary">
                                    <i className="fas fa-sign-in-alt"></i> Sign
                                    Up
                                </button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
