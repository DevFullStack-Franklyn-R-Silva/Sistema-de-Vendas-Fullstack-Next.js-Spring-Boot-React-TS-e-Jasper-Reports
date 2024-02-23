// Importação de módulos e componentes necessários
import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page";
import { Venda } from "app/models/vendas";
import { useClienteService } from "app/services";
import { useFormik } from "formik";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

// Definição da interface para as propriedades do componente VendasForm
interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

// Definição do esquema inicial para o formulário de vendas
const formScheme: Venda = {
  cliente: null!,
  produtos: [],
  total: 0,
  formaPagamento: "",
};

// Componente funcional React para o formulário de vendas
export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  // Serviço de cliente personalizado para obter dados de clientes
  const clienteService = useClienteService();

  const [codigoProduto, setCodigoProduto] = useState<string>("");

  // Estado para armazenar a lista de clientes obtida do serviço
  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });

  // Formik hook para gerenciar o estado do formulário
  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formScheme,
  });

  // Função para lidar com a pesquisa automática de clientes ao digitar no campo de autocompletar
  const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
    const nome = e.query;
    clienteService
      .find(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  // Função para lidar com a seleção de um cliente no campo de autocompletar
  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: Cliente = e.value;
    formik.setFieldValue("cliente", clienteSelecionado);
  };

  const handleCodigoProdutoSelect = (event: any) => {
    console.log(codigoProduto);
  };

  // Renderização do componente de formulário de vendas
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="cliente">Cliente: *</label>
          <AutoComplete
            suggestions={listaClientes.content}
            completeMethod={handleClienteAutocomplete}
            value={formik.values.cliente}
            field="nome"
            id="cliente"
            name="cliente"
            onChange={handleClienteChange}
          />
        </div>

        <div className="p-grid">
          <div className="p-col-2">
            <span className="p-float-label">
              <InputText
                id="codigoProduto"
                onBlur={handleCodigoProdutoSelect}
                value={codigoProduto}
                onChange={(e) => setCodigoProduto(e.target.value)}
              />
              <label htmlFor="codigoProduto">Código</label>
            </span>
          </div>

          <div className="p-col-6">
            <AutoComplete />
          </div>

          <div className="p-col-2">
            <span className="p-float-label">
              <InputText id="qtdProduto" />
              <label htmlFor="qtdProduto">QTD</label>
            </span>
          </div>

          <div className="p-col-2">
            <Button label="Adicionar" />
          </div>
        </div>
        <Button type="submit" label="Finalizar" />
      </div>
    </form>
  );
};
