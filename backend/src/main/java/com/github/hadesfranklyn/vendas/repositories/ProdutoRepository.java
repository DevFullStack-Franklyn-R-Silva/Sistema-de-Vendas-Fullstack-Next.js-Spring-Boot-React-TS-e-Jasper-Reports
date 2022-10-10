package com.github.hadesfranklyn.vendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.hadesfranklyn.vendas.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
