import { Cliente } from "../clientes";
import { Produto } from "../produtos";

export interface Venda {
  cliente?: Cliente;
  itens?: Array<ItemVenda>;
  formaPagamento?: string;
  total: number;
}

export interface ItemVenda {
  produto: Produto;
  quantidade: number;
}
