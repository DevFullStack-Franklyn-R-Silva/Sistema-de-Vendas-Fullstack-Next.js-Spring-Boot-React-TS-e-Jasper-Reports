import { Input, InputCPF, Layout } from "components";
import { useFormik } from "formik";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { Cliente } from "app/models/clientes";
import { useState } from "react";

interface ConsultaClientesForm {
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: "1",
            nome: "fulano",
            email: "fulano@fulano.com",
            cpf: "000.000.000-55",
        },
    ]);

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        console.log(filtro);
    };

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange,
    } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: { nome: "", cpf: "" },
    });

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
            <div className="columns">
                <div className="is-full">
                    <DataTable value={clientes}>
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
