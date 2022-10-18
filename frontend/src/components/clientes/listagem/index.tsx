import { Input, InputCPF, Layout } from "components";
import { useFormik } from "formik";
import { Button } from "primereact/button";

interface ConsultaClientesForm {
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {
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
            <Button label="Teste"/>
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
        </Layout>
    );
};
