import { Input, Layout } from "components";
import { useFormik } from "formik";

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
                    <Input
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
