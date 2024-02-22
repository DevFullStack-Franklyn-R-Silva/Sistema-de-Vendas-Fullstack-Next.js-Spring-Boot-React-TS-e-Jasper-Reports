import { Cliente } from "app/models/clientes";
import { Input, InputCPF, InputDate, InputTelefone } from "components";
import { useFormik } from "formik";
import Link from "next/link";
import { validationScheme } from "./validationSchema";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  cadastro: "",
  cpf: "",
  dataNascimento: "",
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
    enableReinitialize: true,
    validationSchema: validationScheme,
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
          error={formik.errors.nome}
        />
      </div>
      <div className="columns">
        <InputCPF
          id="cpf"
          name="cpf"
          label="CPF: *"
          autoComplete="off"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          error={formik.errors.cpf}
        />

        <InputDate
          id="dataNascimento"
          name="dataNascimento"
          label="Data Nascimento: *"
          autoComplete="off"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.dataNascimento}
          error={formik.errors.dataNascimento}
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
          error={formik.errors.endereco}
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
          error={formik.errors.email}
        />

        <InputTelefone
          id="telefone"
          name="telefone"
          label="Telefone: *"
          autoComplete="off"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.telefone}
          error={formik.errors.telefone}
        />
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">
            {formik.values.id ? "Atualizar" : "Salvar"}
          </button>
          <Link href="/consultas/clientes">
            <button className="button is-link is-light">Voltar</button>
          </Link>
        </div>
      </div>
    </form>
  );
};
