import { useState } from "react";
import { Layout, Input, Message } from "components";
import { useProdutoService } from "app/services";
import { Produto } from "app/models/produtos";
import { converterEmBigDecimal } from "app/util/money";
import { Alert } from "components/common/message";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    sku: yup.string().required(),
    nome: yup.string().required(),
    descricao: yup.string().required(),
    preco: yup.number().required(),
});

export const CadastroProdutos: React.FC = () => {
    const [id, setId] = useState<string>();
    const [cadastro, setCadastro] = useState<string>();
    const service = useProdutoService();
    const [sku, setSku] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [messages, setMessages] = useState<Array<Alert>>([]);

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

                setMessages([
                    {
                        tipo: "danger",
                        field,
                        texto: message,
                    },
                ]);
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
                    onChange={setSku}
                    value={sku}
                    id="inputSku"
                    placeholder="Digite o SKU do produto"
                />

                <Input
                    label="Preço: *"
                    columnClasses="is-half"
                    onChange={setPreco}
                    value={preco}
                    id="inputPreco"
                    placeholder="Digite o Preço do produto"
                    currency={true}
                    maxLength={16}
                />
            </div>

            <div className="columns">
                <Input
                    label="Nome: *"
                    columnClasses="is-full"
                    onChange={setNome}
                    value={nome}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
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
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>
        </Layout>
    );
};
