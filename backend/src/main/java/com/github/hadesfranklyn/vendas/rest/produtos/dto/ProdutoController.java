package com.github.hadesfranklyn.vendas.rest.produtos.dto;

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
import com.github.hadesfranklyn.vendas.rest.produtos.ProdutoFormRequestDTO;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private ProdutoRepository repository;

	@GetMapping
	public List<ProdutoFormRequestDTO> getLista() {
		return repository.findAll().stream().map(ProdutoFormRequestDTO::fromModel).collect(Collectors.toList());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<ProdutoFormRequestDTO> getById(@PathVariable Long id) {
		Optional<Produto> produtoExistente =  repository.findById(id);
		
		if (produtoExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		var produto = produtoExistente.map(ProdutoFormRequestDTO::fromModel).get();
		return ResponseEntity.ok(produto);
		
	}

	@PostMapping
	public ProdutoFormRequestDTO salvar(@RequestBody ProdutoFormRequestDTO produtoDTO) {

		Produto entidadeProduto = produtoDTO.toModel();
		repository.save(entidadeProduto);

		return ProdutoFormRequestDTO.fromModel(entidadeProduto);
	}

	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ProdutoFormRequestDTO produtoDTO) {
	    Optional<Produto> produtoExistenteOptional = repository.findById(id);

	    if (produtoExistenteOptional.isEmpty()) {
	        return ResponseEntity.notFound().build();
	    }

	    Produto produtoExistente = produtoExistenteOptional.get();
	    
	    // Atualizar apenas os campos necessários
	    produtoExistente.setNome(produtoDTO.getNome());
	    produtoExistente.setDescricao(produtoDTO.getDescricao());
	    produtoExistente.setPreco(produtoDTO.getPreco());
	    produtoExistente.setSku(produtoDTO.getSku());

	    // Salvar a entidade atualizada
	    repository.save(produtoExistente);

	    return ResponseEntity.ok().build();
	}

	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deletar( @PathVariable Long id ){
		Optional<Produto> produtoExistente = repository.findById(id);

		if(produtoExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		repository.delete(produtoExistente.get());
		return ResponseEntity.noContent().build();
	}
	
}
