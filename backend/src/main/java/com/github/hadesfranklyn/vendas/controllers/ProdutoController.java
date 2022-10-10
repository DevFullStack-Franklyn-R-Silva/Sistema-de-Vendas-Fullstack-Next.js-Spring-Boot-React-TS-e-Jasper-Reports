package com.github.hadesfranklyn.vendas.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.hadesfranklyn.vendas.dto.ProdutoDTO;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
	
	@PostMapping
	public ProdutoDTO salvar(@RequestBody ProdutoDTO produtoDTO) {
		System.out.println(produtoDTO);
		return produtoDTO;
	}
}
