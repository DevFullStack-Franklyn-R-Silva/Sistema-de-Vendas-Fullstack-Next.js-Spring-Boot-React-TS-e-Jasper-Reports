package com.github.hadesfranklyn.vendas.rest.clientes;

import java.time.LocalDate;

import com.github.hadesfranklyn.vendas.model.Cliente;

public class ClienteFormRequestDTO {

	private Long id;
	private String nome;
	private String cpf;
	private LocalDate dataNascimento;
	private String endereco;
	private String email;
	private String telefone;
	private LocalDate cadastro;

	// Metodos
	public Cliente toModel() {
		return new Cliente(id, dataNascimento, cpf, nome, endereco, telefone, email, cadastro);
	}

	public static ClienteFormRequestDTO fromModel(Cliente cliente) {
		return new ClienteFormRequestDTO(
				cliente.getId(), 
				cliente.getNome(), 
				cliente.getCpf(), 
				cliente.getNascimento(),
				cliente.getEndereco(), 
				cliente.getEmail(), 
				cliente.getTelefone(), 
				cliente.getDataCadastro());
	}

	// Construtores
	public ClienteFormRequestDTO() {
		super();
	}

	public ClienteFormRequestDTO(Long id, String nome, String cpf, LocalDate dataNascimento, String endereco,
			String email, String telefone, LocalDate cadastro) {
		super();
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
		this.endereco = endereco;
		this.email = email;
		this.telefone = telefone;
		this.cadastro = cadastro;
	}

	// get e set
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public LocalDate getCadastro() {
		return cadastro;
	}

	public void setCadastro(LocalDate cadastro) {
		this.cadastro = cadastro;
	}

}
