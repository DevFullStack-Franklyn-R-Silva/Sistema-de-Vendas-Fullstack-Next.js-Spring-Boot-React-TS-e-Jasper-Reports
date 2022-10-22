import { Venda } from "app/models/vendas";
import { VendasForm } from "app/models/vendas/form";
import { Layout } from "components"

export const Vendas: React.FC = () => {
    const handleSubmit = (venda: Venda) => { 
        console.log(venda);
    }
    return (
        <Layout titulo="Vendas">
            <VendasForm onSubmit={handleSubmit}/>
        </Layout>
    )
}