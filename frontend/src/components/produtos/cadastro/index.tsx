import { Layout } from "components/layout";

export const CadastroProdutos: React.FC = () => {
    return (
        <Layout titulo="Produtos">
            <div className="columns">
                <div className="field is-half column">
                    <label className="label" htmlFor="inputSku">
                        SKU: *
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            id="inputSku"
                            placeholder="Digite o SKU do produto"
                        />
                    </div>
                </div>

                <div className="field is-half column">
                    <label className="label" htmlFor="inputPreco">
                        Preço: *
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            id="inputPreco"
                            placeholder="Digite o Preço do produto"
                        />
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="field is-full column">
                    <label className="label" htmlFor="inputNome">
                        Nome: *
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            id="inputNome"
                            placeholder="Digite o Nome do produto"
                        />
                    </div>
                </div>
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
                            placeholder="Digite o Descrição detalhada do produto"
                        />
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link">Salvar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>
        </Layout>
    );
};
