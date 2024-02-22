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

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {
  const service = useClienteService();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 10,
    totalElements: 0,
  });

  const handleSubmit = (filtro: ConsultaClientesForm) => {
    //@ts-ignore
    handlePage(null);
  };

  const {
    handleSubmit: formikSubmit,
    values: filtro,
    handleChange,
  } = useFormik<ConsultaClientesForm>({
    onSubmit: handleSubmit,
    initialValues: { nome: "", cpf: "" },
  });

  const handlePage = (event: DataTablePageParams) => {
    setLoading(true);
    service
      .find(filtro.nome, filtro.cpf, event?.page, event?.rows)
      .then((result) => {
        setClientes({ ...result, first: event?.first });
      })
      .finally(() => setLoading(false));
  };

  const deletar = (cliente: Cliente) => {
    console.log(cliente.id);
    service.deletar(cliente.id).then((result) => {
      //@ts-ignore
      handlePage(null);
    });
  };

  const actionTemplate = (registro: Cliente) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState<boolean>(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toast = useRef(null);
    const url = `/cadastros/clientes?id=${registro.id}`;

    const accept = () => {
      //@ts-ignore
      toast.current.show({
        severity: "info",
        summary: "Mensagem",
        detail: "Cliente DELETADO com sucesso!",
        life: 10000,
      });
      deletar(registro);
    };

    const reject = () => {
      //@ts-ignore
      toast.current.show({
        severity: "warn",
        summary: "Mensagem",
        detail: "Cliente NÃO Deletado!",
        life: 15000,
      });
    };

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

  return (
    <Layout titulo="Clientes">
      <form onSubmit={formikSubmit}>
        <div className="columns">
          <Input
            label="Nome"
            id="nome"
            columnClasses="is-half"
            autoComplete="off"
            onChange={handleChange}
            name="nome"
            value={filtro.nome}
          />

          <InputCPF
            label="CPF"
            id="cpf"
            columnClasses="is-half"
            onChange={handleChange}
            name="cpf"
            value={filtro.cpf}
          />
        </div>

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
            <Column field="id" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="Email" />
            <Column body={actionTemplate} />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};
