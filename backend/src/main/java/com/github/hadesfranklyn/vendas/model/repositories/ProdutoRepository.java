package com.github.hadesfranklyn.vendas.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.github.hadesfranklyn.vendas.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
