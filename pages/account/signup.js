import Layout from "@/components/Layout";
import styles from "@/styles/Signup.module.css";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function SignUpPage() {
    const { register, login, error, user } = useContext(AuthContext);
    const router = useRouter();
    if (user) {
        router.push("/");
    }

    const [btnState, setBtnState] = useState("register");

    const regClickHandler = (e) => {
        e.preventDefault();
        setBtnState("register");
    };

    const logClickHandler = (e) => {
        e.preventDefault();
        setBtnState("login");
    };

    // Form controls Register

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => error && toast.error(error));

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error("Passwords do not match!");
            return;
        }

        register({ first_name, last_name, email, password });
    };

    // Form Controls Login

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        login({ loginEmail, loginPassword });
    };

    return (
        <Layout title="Edulink | Sign Up">
            <div className="container flex" style={{ margin: 0 }}>
                <div className={styles.main_card}>
                    <div className={styles.btn_group}>
                        <button
                            onClick={regClickHandler}
                            className={styles.main_button}
                            style={
                                btnState === "register"
                                    ? {
                                          background: "rgb(41, 205, 255)",
                                          color: "white",
                                          boxShadow:
                                              "0 2px 2px 1px rgba(68, 68, 95, 0.4)",
                                      }
                                    : {}
                            }
                        >
                            Register
                        </button>
                        <button
                            onClick={logClickHandler}
                            className={styles.main_button}
                            style={
                                btnState === "login"
                                    ? {
                                          background: "rgb(41, 205, 255)",
                                          color: "white",
                                          boxShadow:
                                              "2px 2px 2px 1px rgba(68, 68, 95, 0.4)",
                                      }
                                    : {}
                            }
                        >
                            Login
                        </button>
                    </div>
                    <ToastContainer />
                    {btnState === "register" ? (
                        <>
                            <div className={styles.auth}>
                                <h1>Register</h1>
                                <form onSubmit={handleRegisterSubmit}>
                                    <div>
                                        <label htmlFor="first_name">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            value={first_name}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last_name">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            value={last_name}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="passwordConfirm">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="passwordConfirm"
                                            value={passwordConfirm}
                                            onChange={(e) =>
                                                setPasswordConfirm(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="Register"
                                        className="btn"
                                    />

                                    <p>
                                        Registered already? Click{" "}
                                        <span>
                                            {" "}
                                            <button
                                                onClick={() =>
                                                    setBtnState("login")
                                                }
                                            >
                                                here
                                            </button>
                                        </span>{" "}
                                        to Login
                                    </p>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.auth}>
                                <h1>Log In</h1>
                                <form onSubmit={handleLoginSubmit}>
                                    <div>
                                        <label htmlFor="loginEmail">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="loginEmail"
                                            value={loginEmail}
                                            onChange={(e) =>
                                                setLoginEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="loginPassword">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="loginPassword"
                                            value={loginPassword}
                                            onChange={(e) =>
                                                setLoginPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="Login"
                                        className="btn"
                                    />
                                </form>

                                <p>
                                    Don&apos;t have an account?{" "}
                                    <button
                                        onClick={() => setBtnState("register")}
                                    >
                                        Register
                                    </button>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}
