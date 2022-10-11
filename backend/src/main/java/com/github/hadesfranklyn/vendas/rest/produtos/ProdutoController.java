package com.github.hadesfranklyn.vendas.rest.produtos;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.hadesfranklyn.vendas.model.Produto;
import com.github.hadesfranklyn.vendas.model.repositories.ProdutoRepository;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private ProdutoRepository repository;

	@GetMapping
	public List<ProdutoFromRequestDTO> getLista() {
		return repository.findAll().stream().map(ProdutoFromRequestDTO::fromModel).collect(Collectors.toList());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<ProdutoFromRequestDTO> getById(@PathVariable Long id) {
		Optional<Produto> produtoExistente =  repository.findById(id);
		
		if (produtoExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		var produto = produtoExistente.map(ProdutoFromRequestDTO::fromModel).get();
		return ResponseEntity.ok(produto);
		
	}

	@PostMapping
	public ProdutoFromRequestDTO salvar(@RequestBody ProdutoFromRequestDTO produtoDTO) {

		Produto entidadeProduto = produtoDTO.toModel();

		repository.save(entidadeProduto);

		return ProdutoFromRequestDTO.fromModel(entidadeProduto);
	}

	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ProdutoFromRequestDTO produtoDTO) {
		Optional<Produto> produtoExistente = repository.findById(id);

		if (produtoExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Produto entidade = produtoDTO.toModel();
		entidade.setId(id);
		repository.save(entidade);

		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id){
		Optional<Produto> produtoExistente = repository.findById(id);

		if (produtoExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		repository.delete(produtoExistente.get());
		return ResponseEntity.noContent().build();
	}
	
}
