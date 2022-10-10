import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Vendas App</title>
                <meta name="description" content="Sistema de Vendas" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button className="button">Bem Vindo!</button>
            
        </div>
    );
}
