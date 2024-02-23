package com.github.hadesfranklyn.vendas.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "tb_cliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "data_de_nascimento")
	@NotNull(message = "A data de nascimento não pode ser nula")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate nascimento;

	@Column(name = "cpf")
	 @Length(min = 14, max = 14, message = "CPF deve ter o formato 000.000.000-00")
	private String cpf;

	@Column(name = "nome")
	@NotBlank(message = "O nome não pode estar em branco")
	private String nome;

	@Column(name = "endereco")
	@NotBlank(message = "O endereço não pode estar em branco")
	private String endereco;

	@Column(name = "telefone")
	@Pattern(regexp = "\\(\\d{2}\\)\\d{4,5}-\\d{4}", message = "Formato de telefone inválido. Use (00)1234-5678 ou (00)12345-6789")
	private String telefone;

	@Column(name = "email")
	@Email(message = "Por favor, forneça um endereço de e-mail válido")
	private String email;

	@Column(name = "data_de_cadastro")
	private LocalDate dataCadastro;

	// metodos
	@PrePersist
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}

	// Construtores
	public Cliente() {
		super();
	}

	public Cliente(Long id, LocalDate nascimento, String cpf, String nome, String endereco, String telefone,
			String email, LocalDate dataCadastro) {
		super();
		this.id = id;
		this.nascimento = nascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.endereco = endereco;
		this.telefone = telefone;
		this.email = email;
		this.dataCadastro = dataCadastro;
	}

	// Construtor sem ID e Data_cadastro
	public Cliente(LocalDate nascimento, String cpf, String nome, String endereco, String telefone, String email) {
		super();
		this.nascimento = nascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.endereco = endereco;
		this.telefone = telefone;
		this.email = email;
	}

	// get e set
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getNascimento() {
		return nascimento;
	}

	public void setNascimento(LocalDate nascimento) {
		this.nascimento = nascimento;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Cliente [id=");
		builder.append(id);
		builder.append(", nascimento=");
		builder.append(nascimento);
		builder.append(", cpf=");
		builder.append(cpf);
		builder.append(", nome=");
		builder.append(nome);
		builder.append(", endereco=");
		builder.append(endereco);
		builder.append(", telefone=");
		builder.append(telefone);
		builder.append(", email=");
		builder.append(email);
		builder.append(", dataCadastro=");
		builder.append(dataCadastro);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Cliente other = (Cliente) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
