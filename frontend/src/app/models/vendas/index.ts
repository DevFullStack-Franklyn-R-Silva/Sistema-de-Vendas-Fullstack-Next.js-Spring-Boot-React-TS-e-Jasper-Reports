import { Cliente } from "../clientes";
import { Produto } from "../produtos";

export interface Venda {
  cliente?: Cliente;
  produtos?: Array<Produto>;
  formaPagamento?: string;
  total: number;
}
