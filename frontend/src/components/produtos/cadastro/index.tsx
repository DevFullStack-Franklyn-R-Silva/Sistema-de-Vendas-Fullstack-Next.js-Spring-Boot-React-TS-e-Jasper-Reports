import { useState, useEffect } from "react";
import { Layout, Input, Message } from "components";
import { useProdutoService } from "app/services";
import { Produto } from "app/models/produtos";
import { converterEmBigDecimal, formatReal } from "app/util/money";
import { Alert } from "components/common/message";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

const msgCampoObrigatorio = "Campo Obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup
        .string()
        .trim()
        .required(msgCampoObrigatorio)
        .min(10, "Deve possuir pelo menos 10 caracteres."),
    preco: yup
        .number()
        .required(msgCampoObrigatorio)
        .moreThan(0, "Valor deve ser maior que 0,00 Zero"),
});

interface FormErrors {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {
    const [id, setId] = useState<string>();
    const [cadastro, setCadastro] = useState<string>();
    const service = useProdutoService();
    const [sku, setSku] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const router = useRouter();

    const { id: queryId } = router.query;

    useEffect(() => {
        if (queryId) {
            service.carregarProduto(queryId).then((produtoEncontrado: any) => {
                setId(produtoEncontrado.id);
                setSku(produtoEncontrado.sku);
                setNome(produtoEncontrado.nome);
                setDescricao(produtoEncontrado.descricao);
                setPreco(formatReal(`${produtoEncontrado.preco}`));
                setCadastro(produtoEncontrado.cadastro || ``);
            });
        }
    }, [queryId, service]);

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao,
        };

        validationSchema
            .validate(produto)
            .then((obj) => {
                setErrors({});
                if (id) {
                    service.atualizar(produto).then((response) => {
                        setMessages([
                            {
                                tipo: "success",
                                texto: "Produto atualizado com sucesso!",
                            },
                        ]);
                    });
                } else {
                    service.salvar(produto).then((produtoResposta) => {
                        setId(produtoResposta.id);
                        setCadastro(produtoResposta.cadastro);
                        setMessages([
                            {
                                tipo: "success",
                                texto: "Produto Salvo com sucesso!",
                            },
                        ]);
                    });
                }
            })
            .catch((error) => {
                const field = error.path;
                const message = error.message;

                setErrors({
                    [field]: message,
                });

                // console.log(JSON.parse(JSON.stringify(error)));
            });
    };

    return (
        <Layout titulo="Produtos" mensagens={messages}>
            {id && (
                <div className="columns">
                    <Input
                        label="Código:"
                        columnClasses="is-half"
                        value={id}
                        id="inputId"
                        disabled={true}
                    />

                    <Input
                        label="Data do Cadastro:"
                        columnClasses="is-half"
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled={true}
                    />
                </div>
            )}

            <div className="columns">
                <Input
                    label="SKU: *"
                    columnClasses="is-half"
                    onChange={(e) => setSku(e.target.value)}
                    value={sku}
                    id="inputSku"
                    placeholder="Digite o SKU do produto"
                    error={errors.sku}
                />

                <Input
                    label="Preço: *"
                    columnClasses="is-half"
                    onChange={(e) => setPreco(e.target.value)}
                    value={preco}
                    id="inputPreco"
                    placeholder="Digite o Preço do produto"
                    currency={true}
                    maxLength={16}
                    error={errors.preco}
                />
            </div>

            <div className="columns">
                <Input
                    label="Nome: *"
                    columnClasses="is-full"
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    error={errors.nome}
                />
            </div>

            <div className="columns">
                <div className="field is-full column">
                    <label className="label" htmlFor="inputDescricao">
                        Descrição: *
                    </label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            id="inputDescricao"
                            value={descricao}
                            onChange={(event) =>
                                setDescricao(event.target.value)
                            }
                            placeholder="Digite o Descrição detalhada do produto"
                        />
                        {errors.descricao && (
                            <p className="help is-danger">{errors.descricao}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button is-link is-light">
                            Voltar
                        </button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};
