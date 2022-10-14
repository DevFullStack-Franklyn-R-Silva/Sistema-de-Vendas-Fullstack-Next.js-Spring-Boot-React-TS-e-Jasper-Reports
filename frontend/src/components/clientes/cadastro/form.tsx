import { Cliente } from "app/models/clientes";
import { useFormik } from "formik";
import { Input } from "components";
import { formatWithOptions } from "util";
import Link from "next/link";

interface ClienteFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
    cadastro: "",
    cpf: "",
    dataNascimento: "01/01/2021",
    email: "",
    endereco: "",
    id: "",
    nome: "",
    telefone: "",
};

export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit,
}) => {
    const formik = useFormik<Cliente>({
        initialValues: { ...formScheme, ...cliente },
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id && (
                <div className="columns">
                    <Input
                        id="id"
                        name="id"
                        label="Código: "
                        autoComplete="off"
                        disabled={true}
                        columnClasses="is-half"
                        value={formik.values.id}
                    />

                    <Input
                        id="cadastro"
                        name="cadastro"
                        label="Data Cadastro: "
                        autoComplete="off"
                        disabled={true}
                        columnClasses="is-half"
                        value={formik.values.cadastro}
                    />
                </div>
            )}
            <div className="columns">
                <Input
                    id="nome"
                    name="nome"
                    label="Nome: *"
                    autoComplete="off"
                    columnClasses="is-full"
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                />
            </div>
            <div className="columns">
                <Input
                    id="cpf"
                    name="cpf"
                    label="CPF: *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                />

                <Input
                    id="dataNascimento"
                    name="dataNascimento"
                    label="Data Nascimento: *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.dataNascimento}
                />
            </div>
            <div className="columns">
                <Input
                    id="endereco"
                    name="endereco"
                    label="Endereço: *"
                    autoComplete="off"
                    columnClasses="is-full"
                    onChange={formik.handleChange}
                    value={formik.values.endereco}
                />
            </div>
            <div className="columns">
                <Input
                    id="email"
                    name="email"
                    label="E-mail: *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                <Input
                    id="telefone"
                    name="telefone"
                    label="Telefone: *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.telefone}
                />
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" type="submit">
                        {formik.values.id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                {/* <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button is-link is-light">
                            Voltar
                        </button>
                    </Link>
                </div> */}
            </div>
        </form>
    );
};
