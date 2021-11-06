import styles from "@/styles/Unauthorized.module.css";

export default function Unauthorized() {
    return (
        <div>
            <h3 className={styles.message}>Access Denied!</h3>
        </div>
    );
}
