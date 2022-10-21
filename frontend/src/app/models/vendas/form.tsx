import { Venda } from "app/models/vendas";
import { useFormik } from "formik";

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
    cliente: {},
    produtos: [],
    total: 0,
    formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formScheme,
    });

    return <form onSubmit={formik.handleSubmit}></form>;
};
