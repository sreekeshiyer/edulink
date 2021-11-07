import styles from "@/styles/Search.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Search(props) {
    const [term, setTerm] = useState("");

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/${props.push}?term=${term}`);
        setTerm("");
    };

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder={`Search ${props.content}`}
                />
            </form>
        </div>
    );
}

export default Search;
