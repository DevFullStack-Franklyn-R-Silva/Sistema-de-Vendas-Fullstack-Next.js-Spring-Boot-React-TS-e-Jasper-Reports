// Importação de módulos e componentes necessários
import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page";
import { ItemVenda, Venda } from "app/models/vendas";
import { useClienteService, useProdutoService } from "app/services";
import { useFormik } from "formik";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Produto } from "app/models/produtos";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Definição da interface para as propriedades do componente VendasForm
interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

// Definição do esquema inicial para o formulário de vendas
const formScheme: Venda = {
  cliente: null!,
  itens: [] as ItemVenda[],
  total: 0,
  formaPagamento: "",
};

// Componente funcional React para o formulário de vendas
export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  // Inicialização de serviços e estados relacionados ao cliente e produto
  const clienteService = useClienteService();
  const produtoService = useProdutoService();
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [listaFiltradaProdutos, setListaFiltradaProdutos] = useState<Produto[]>(
    []
  );
  const [mensagem, setMensagem] = useState<string>("");
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0);
  const [produto, setProduto] = useState<Produto>(null!);
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

  // Função para lidar com a seleção de um código de produto
  const handleCodigoProdutoSelect = (event: any) => {
    const parsedValue = parseInt(codigoProduto);

    if (!isNaN(parsedValue)) {
      produtoService
        .carregarProduto(parsedValue.toString())
        .then((produtoEncontrado) => setProduto(produtoEncontrado))
        .catch((error) => setMensagem("Produto não encontrado!"));
    }
  };

  // Função para adicionar um produto à venda
  const handleAddProduto = () => {
    const itensAdicionados = formik.values.itens || [];

    const jaExisteOItemNaVenda = itensAdicionados.some(
      (itemVenda: ItemVenda) => {
        return itemVenda.produto.id === produto.id;
      }
    );

    if (jaExisteOItemNaVenda) {
      itensAdicionados.forEach((itemVenda: ItemVenda) => {
        if (itemVenda.produto.id === produto.id) {
          itemVenda.quantidade = itemVenda.quantidade + quantidadeProduto;
        }
      });
    } else {
      itensAdicionados.push({
        produto: produto,
        quantidade: quantidadeProduto,
      });
    }

    setProduto(null!);
    setCodigoProduto(``);
    setQuantidadeProduto(0);
  };

  // Função para fechar o dialog quando um produto não é encontrado
  const handleFecharDialogProdutoNaoEncontrado = () => {
    setCodigoProduto("");
    setMensagem("");
    setProduto(null!);
  };

  const handleProdutoAutoComplete = async (
    event: AutoCompleteCompleteMethodParams
  ) => {
    if (!listaProdutos.length) {
      const produtosEncontrados = await produtoService.listar();
      setListaProdutos(produtosEncontrados);
    }
    const produtosEncontrados = listaProdutos.filter((produto: Produto) => {
      return produto.nome?.toUpperCase().includes(event.query.toUpperCase());
    });

    setListaFiltradaProdutos(produtosEncontrados);
  };

  // Função para renderizar o rodapé do dialog de mensagem
  const dialogMensagemFooter = () => {
    return (
      <div>
        <Button label="Ok" onClick={(e) => setMensagem("")} />
      </div>
    );
  };

  // Função para desabilitar o botão de adicionar produto
  const disableAddProdutoButton = () => {
    return !produto || !quantidadeProduto;
  };

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
            <AutoComplete
              id="produto"
              name="produto"
              value={produto}
              field="nome"
              suggestions={listaFiltradaProdutos}
              completeMethod={handleProdutoAutoComplete}
              onChange={(e) => setProduto(e.value)}
            />
          </div>

          <div className="p-col-2">
            <span className="p-float-label">
              <InputText
                id="qtdProduto"
                value={quantidadeProduto}
                onChange={(e) => setQuantidadeProduto(Number(e.target.value))}
              />
              <label htmlFor="qtdProduto">QTD</label>
            </span>
          </div>

          <div className="p-col-2">
            <Button
              type="button"
              label="Adicionar"
              onClick={handleAddProduto}
              disabled={disableAddProdutoButton()}
            />
          </div>
          <div className="p-col-12">
            <DataTable value={formik.values.itens}>
              <Column field="produto.id" header="Código" />
              <Column field="produto.sku" header="SKU" />
              <Column field="produto.nome" header="Produto" />
              <Column field="produto.preco" header="Preço Unitário" />
              <Column field="quantidade" header="QTD" />
              <Column
                header="Total"
                body={(itemVenda: ItemVenda) => {
                  return (
                    <div>{itemVenda.produto.preco! * itemVenda.quantidade}</div>
                  );
                }}
              />
            </DataTable>
          </div>
        </div>
        <Button type="submit" label="Finalizar" />
      </div>
      <Dialog
        header="Atenção"
        position="top"
        visible={!!mensagem}
        onHide={handleFecharDialogProdutoNaoEncontrado}
        footer={dialogMensagemFooter}
      >
        {mensagem}
      </Dialog>
    </form>
  );
};
