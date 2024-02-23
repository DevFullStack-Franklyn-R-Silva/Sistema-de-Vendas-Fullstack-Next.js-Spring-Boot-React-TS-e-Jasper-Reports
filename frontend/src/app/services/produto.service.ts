import { httpClient } from "app/http";
import { Produto } from "app/models/produtos";
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/produtos";

export const useProdutoService = () => {
  const salvar = async (produto: Produto): Promise<Produto> => {
    const response: AxiosResponse<Produto> = await httpClient.post<Produto>(
      resourceURL,
      produto
    );
    console.log(response.data);
    return response.data;
  };

  const atualizar = async (produto: Produto): Promise<void> => {
    const url: string = `${resourceURL}/${produto.id}`;
    await httpClient.put<Produto>(url, produto);
    // try {
    //   const response = await httpClient.put<Produto>(url, produto);
    //   console.log("Produto atualizado com sucesso:", response.data);
    // } catch (error) {
    //   console.error("Erro ao atualizar o produto:", error);
    // }
  };

  const carregarProduto = async (id: any): Promise<Produto> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Produto> = await httpClient.get(url);
    return response.data;
  };

  const deletar = async (id: any): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const listar = async (): Promise<Produto[]> => {
    const response: AxiosResponse<Produto[]> = await httpClient.get(
      resourceURL
    );
    return response.data;
  };

  return {
    salvar,
    atualizar,
    carregarProduto,
    deletar,
    listar,
  };
};
