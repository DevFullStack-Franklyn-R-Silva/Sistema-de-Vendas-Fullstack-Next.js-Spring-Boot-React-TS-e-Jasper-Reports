import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page";
import { useClienteService } from "app/services";
import { Input, InputCPF, Layout } from "components";
import { useFormik } from "formik";
import { Column } from "primereact/column";
import { DataTable, DataTablePageParams } from "primereact/datatable";
import { useState } from "react";

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
        size: 0,
        totalElements: 0,
    });

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        // @ts-ignore
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

    return (
        <Layout titulo="Clientes">
            <form onSubmit={formikSubmit}>
                <div className="columns">
                    <Input
                        label="Nome"
                        id="nome"
                        name="nome"
                        value={filtro.nome}
                        columnClasses="is-half"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <InputCPF
                        label="CPF"
                        id="cpf"
                        name="cpf"
                        value={filtro.cpf}
                        columnClasses="is-half"
                        onChange={handleChange}
                    />
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">
                            Consultar
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
                        lazy={true}
                        paginator={true}
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
                    </DataTable>
                </div>
            </div>
        </Layout>
    );
};
