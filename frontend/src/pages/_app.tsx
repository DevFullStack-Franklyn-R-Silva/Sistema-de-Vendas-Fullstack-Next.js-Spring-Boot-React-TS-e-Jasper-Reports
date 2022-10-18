import type { AppProps } from "next/app";
import "bulma/css/bulma.css";
import "components/common/loader/loader.css";
import "primereact/resources/themes/luna-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
