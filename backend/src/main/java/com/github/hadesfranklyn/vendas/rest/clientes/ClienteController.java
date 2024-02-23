package com.github.hadesfranklyn.vendas.rest.clientes;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.hadesfranklyn.vendas.model.Cliente;
import com.github.hadesfranklyn.vendas.model.repositories.ClienteRepository;
import com.github.hadesfranklyn.vendas.rest.clientes.dto.ClienteFormRequestDTO;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

	@Autowired
	private ClienteRepository repository;

	@PostMapping
	public ResponseEntity<ClienteFormRequestDTO> salvar(@RequestBody ClienteFormRequestDTO request) {
		Cliente cliente = request.toModel();
		repository.save(cliente);
		return ResponseEntity.ok(ClienteFormRequestDTO.fromModel(cliente));
	}

	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ClienteFormRequestDTO request) {

		Optional<Cliente> clienteExistente = repository.findById(id);
		if (clienteExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Cliente cliente = request.toModel();
		cliente.setId(id);
		repository.save(cliente);
		return ResponseEntity.noContent().build();
	} 

	@GetMapping("{id}")
	public ResponseEntity<ClienteFormRequestDTO> getById(@PathVariable Long id) {
		return repository.findById(id).map(ClienteFormRequestDTO::fromModel)
				.map(clienteFR -> ResponseEntity.ok(clienteFR)).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		return repository.findById(id).map(cliente -> {
			repository.delete(cliente);
			return ResponseEntity.noContent().build();
		}).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping
	public Page<ClienteFormRequestDTO> getLista(
			@RequestParam(value = "nome", required = false, defaultValue = "") String nome,
			@RequestParam(value = "cpf", required = false, defaultValue = "") String cpf, Pageable pageable) {
		return repository.buscarPorNomeCpf("%" + nome + "%", "%" + cpf + "%", pageable)
				.map(ClienteFormRequestDTO::fromModel);

	}
}
