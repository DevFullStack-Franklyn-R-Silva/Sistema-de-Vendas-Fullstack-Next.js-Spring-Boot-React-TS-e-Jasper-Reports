package com.github.hadesfranklyn.vendas.rest.produtos;

import java.math.BigDecimal;

public class ProdutoFromRequestDTO {

	private String descricao;
	private String nome;
	private BigDecimal preco;
	private String sku;

	public ProdutoFromRequestDTO() {
		super();
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ProdutoDTO [descricao=");
		builder.append(descricao);
		builder.append(", nome=");
		builder.append(nome);
		builder.append(", preco=");
		builder.append(preco);
		builder.append(", sku=");
		builder.append(sku);
		builder.append("]");
		return builder.toString();
	}

}
