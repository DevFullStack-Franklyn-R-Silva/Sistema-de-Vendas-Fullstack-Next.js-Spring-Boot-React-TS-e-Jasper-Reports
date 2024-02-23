// Importando as dependências e componentes necessários
import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page";
import { useClienteService } from "app/services";
import { Input, InputCPF, Layout } from "components";
import { useFormik } from "formik";
import Router from "next/router";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { DataTable, DataTablePageParams } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

// Definindo a forma dos dados do formulário
interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

// Componente funcional React para listar clientes
export const ListagemClientes: React.FC = () => {
  // Inicializando estados e serviços necessários
  const service = useClienteService();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 10,
    totalElements: 0,
  });

  // Lidando com a submissão do formulário
  const handleSubmit = (filtro: ConsultaClientesForm) => {
    handlePage(null!);
  };

  // Hook Formik para lidar com o formulário
  const {
    handleSubmit: formikSubmit,
    values: filtro,
    handleChange,
  } = useFormik<ConsultaClientesForm>({
    onSubmit: handleSubmit,
    initialValues: { nome: "", cpf: "" },
  });

  // Lidando com a paginação
  const handlePage = (event: DataTablePageParams) => {
    setLoading(true);
    service
      .find(filtro.nome, filtro.cpf, event?.page, event?.rows)
      .then((result) => {
        setClientes({ ...result, first: event?.first });
      })
      .finally(() => setLoading(false));
  };

  // Deletando um cliente
  const deletar = (cliente: Cliente) => {
    console.log(cliente.id);
    service.deletar(cliente.id).then((result) => {
      handlePage(null!);
    });
  };

  // Criando uma ref para Toast
  const toast = useRef<any>(null);

  // Configurando o estado para o popup de confirmação
  const [visible, setVisible] = useState<boolean>(false);

  // Modelo para ações em cada linha da DataTable
  const actionTemplate = (registro: Cliente) => {
    const url = `/cadastros/clientes?id=${registro.id}`;

    // Funções de aceitar e rejeitar para o popup de confirmação
    const accept = () => {
      toast.current.show({
        severity: "info",
        summary: "Mensagem",
        detail: "Cliente DELETADO com sucesso!",
        life: 10000,
      });
      deletar(registro);
    };

    const reject = () => {
      toast.current.show({
        severity: "warn",
        summary: "Mensagem",
        detail: "Cliente NÃO Deletado!",
        life: 15000,
      });
    };

    // Função para exibir o popup de confirmação de exclusão
    const confirmacaoDeletar = (event: { currentTarget: any }) => {
      confirmPopup({
        target: event.currentTarget,
        message: "Confirma a exclusão deste registro?",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept,
        reject,
      });
    };

    // JSX para os botões de ação na DataTable
    return (
      <div>
        <Toast ref={toast} />
        <ConfirmPopup />
        <Button
          label="Editar"
          className="p-button-rounded p-button-info"
          onClick={(e) => Router.push(url)}
        />
        <Button
          label="Deletar"
          onClick={confirmacaoDeletar}
          className="p-button-rounded p-button-danger"
        />
      </div>
    );
  };

  // JSX para o componente principal
  return (
    <Layout titulo="Clientes">
      {/* Formulário para filtrar clientes */}
      <form onSubmit={formikSubmit}>
        <div className="columns">
          {/* Input para o nome do cliente */}
          <Input
            label="Nome"
            id="nome"
            columnClasses="is-half"
            autoComplete="off"
            onChange={handleChange}
            name="nome"
            value={filtro.nome}
          />

          {/* Input para o CPF do cliente */}
          <InputCPF
            label="CPF"
            id="cpf"
            columnClasses="is-half"
            onChange={handleChange}
            name="cpf"
            value={filtro.cpf}
          />
        </div>

        {/* Botões agrupados para enviar o formulário e adicionar um novo cliente */}
        <div className="field is-grouped">
          <div className="control is-link">
            <button type="submit" className="button is-link">
              Consultar
            </button>
          </div>
          <div className="control is-link">
            <button
              type="submit"
              onClick={(e) => Router.push("/cadastros/clientes")}
              className="button is-success"
            >
              Novo
            </button>
          </div>
        </div>
      </form>

      <br />

      {/* Exibindo a DataTable */}
      <div className="columns">
        <div className="is-full">
          <DataTable
            value={clientes.content}
            totalRecords={clientes.totalElements}
            lazy
            paginator
            first={clientes.first}
            rows={clientes.size}
            onPage={handlePage}
            loading={loading}
            emptyMessage="Nenhum registro."
          >
            {/* Colunas para os dados do cliente */}
            <Column field="id" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="Email" />
            {/* Coluna para os botões de ação */}
            <Column body={actionTemplate} />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};
