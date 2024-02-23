package com.github.hadesfranklyn.vendas.model.enums;

public enum FormaPagamento {
    DINHEIRO(1),
    PIX(2),
    CARTAO_DE_CREDITO(3),
    CARTAO_DE_DEBITO(4);

    private final int codigo;

    FormaPagamento(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }
}
