import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
