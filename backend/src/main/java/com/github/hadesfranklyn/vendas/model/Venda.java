package com.github.hadesfranklyn.vendas.model;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.github.hadesfranklyn.vendas.model.enums.FormaPagamento;

@Entity
@Table(name = "tb_venda")
public class Venda {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;

	@Enumerated(EnumType.STRING)
	@Column(name = "forma_pagamento")
	private FormaPagamento formaPagamento;

	@OneToMany(mappedBy = "venda")
	private List<ItemVenda> itens;

	@Column
	private BigDecimal total;

	// constructors
	public Venda() {
		super();
	}

	public Venda(Long id, Cliente cliente, FormaPagamento formaPagamento, List<ItemVenda> itens, BigDecimal total) {
		super();
		this.id = id;
		this.cliente = cliente;
		this.formaPagamento = formaPagamento;
		this.itens = itens;
		this.total = total;
	}

	// get and set
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public FormaPagamento getFormaPagamento() {
		return formaPagamento;
	}

	public void setFormaPagamento(FormaPagamento formaPagamento) {
		this.formaPagamento = formaPagamento;
	}

	public List<ItemVenda> getItens() {
		return itens;
	}

	public void setItens(List<ItemVenda> itens) {
		this.itens = itens;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	// toString
	@Override
	public String toString() {
		return "Venda [id=" + id + ", cliente=" + cliente + ", formaPagamento=" + formaPagamento + ", itens=" + itens
				+ ", total=" + total + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cliente == null) ? 0 : cliente.hashCode());
		result = prime * result + ((formaPagamento == null) ? 0 : formaPagamento.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((itens == null) ? 0 : itens.hashCode());
		result = prime * result + ((total == null) ? 0 : total.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Venda other = (Venda) obj;
		if (cliente == null) {
			if (other.cliente != null)
				return false;
		} else if (!cliente.equals(other.cliente))
			return false;
		if (formaPagamento != other.formaPagamento)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (itens == null) {
			if (other.itens != null)
				return false;
		} else if (!itens.equals(other.itens))
			return false;
		if (total == null) {
			if (other.total != null)
				return false;
		} else if (!total.equals(other.total))
			return false;
		return true;
	}

}
