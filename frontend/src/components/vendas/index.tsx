import { Venda } from "app/models/vendas";
import { Layout } from "components"

export const Vendas: React.FC = () => {
    const handleSubmit = (venda: Venda) => { 
        console.log(venda);
    }
    return (
        <Layout titulo="Vendas">
            
        </Layout>
    )
}