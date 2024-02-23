package com.github.hadesfranklyn.vendas.rest.vendas.dto;

import java.math.BigDecimal;
import java.util.List;

import com.github.hadesfranklyn.vendas.model.enums.FormaPagamento;

public class VendaFormRequestDTO {
	private Long id;
	private Long idCliente;
	private FormaPagamento formaPagamento;
	private List<ItemVendaFormRequestDTO> itens;
	private BigDecimal total;

	// constructors
	public VendaFormRequestDTO() {
		super();
	}

	public VendaFormRequestDTO(Long id, Long idCliente, FormaPagamento formaPagamento,
			List<ItemVendaFormRequestDTO> itens, BigDecimal total) {
		super();
		this.id = id;
		this.idCliente = idCliente;
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

	public Long getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}

	public FormaPagamento getFormaPagamento() {
		return formaPagamento;
	}

	public void setFormaPagamento(FormaPagamento formaPagamento) {
		this.formaPagamento = formaPagamento;
	}

	public List<ItemVendaFormRequestDTO> getItens() {
		return itens;
	}

	public void setItens(List<ItemVendaFormRequestDTO> itens) {
		this.itens = itens;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "VendaFormRequestDTO [id=" + id + ", idCliente=" + idCliente + ", formaPagamento=" + formaPagamento
				+ ", itens=" + itens + ", total=" + total + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((formaPagamento == null) ? 0 : formaPagamento.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((idCliente == null) ? 0 : idCliente.hashCode());
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
		VendaFormRequestDTO other = (VendaFormRequestDTO) obj;
		if (formaPagamento != other.formaPagamento)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (idCliente == null) {
			if (other.idCliente != null)
				return false;
		} else if (!idCliente.equals(other.idCliente))
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
