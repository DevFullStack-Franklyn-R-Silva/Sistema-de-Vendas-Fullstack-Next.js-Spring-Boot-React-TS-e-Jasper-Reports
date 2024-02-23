import Head from "next/head";
import { Layout } from "components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <meta name="description" content="Sistema de Vendas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />
    </div>
  );
}
