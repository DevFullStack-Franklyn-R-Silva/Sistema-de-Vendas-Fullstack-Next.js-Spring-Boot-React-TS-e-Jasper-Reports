package com.github.hadesfranklyn.vendas.rest.produtos;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}
