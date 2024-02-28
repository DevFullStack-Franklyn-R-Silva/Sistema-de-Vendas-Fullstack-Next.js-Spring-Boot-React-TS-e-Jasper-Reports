import { Venda } from "app/models/vendas";
import { Layout } from "components";
import { VendasForm } from "components/vendas/form";
import { useVendaService } from "app/services";
import { Alert } from "components/common/message";
import { useState } from "react";

export const Vendas: React.FC = () => {
  const service = useVendaService();
  const [messages, setMessages] = useState<Alert[]>([]);

  const handleSubmit = (venda: Venda) => {
    service
      .realizarVenda(venda)
      .then((response) => {
        setMessages([
          { texto: "Venda realizado com sucesso!", tipo: "success" },
        ]);
      })
      .catch((error) => {
        console.log(error);
        setMessages([
          {
            texto: "Ocorreu um erro, entre em contato com a administração.",
            tipo: "danger",
          },
        ]);
      });
  };
  return (
    <Layout titulo="Vendas" mensagens={messages}>
      <VendasForm onSubmit={handleSubmit} />
    </Layout>
  );
};
