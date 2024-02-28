package com.github.hadesfranklyn.vendas.model.enums;

public enum FormaPagamento {
    DINHEIRO(0),
    PIX(1),
    CARTAO_DE_CREDITO(2),
    CARTAO_DE_DEBITO(3);

    private final int codigo;

    FormaPagamento(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }
}
