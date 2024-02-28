package com.github.hadesfranklyn.vendas.rest.vendas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.hadesfranklyn.vendas.model.Venda;
import com.github.hadesfranklyn.vendas.model.repositories.ItemVendaRepository;
import com.github.hadesfranklyn.vendas.model.repositories.VendaRepository;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendasController {

	@Autowired
	private VendaRepository repository;
	
	@Autowired
	private ItemVendaRepository itemVendaReposistory;

	@PostMapping
	@Transactional
	public void realizarVenda(@RequestBody Venda venda) {
		repository.save(venda);
		venda.getItens().stream().forEach(iv -> iv.setVenda(venda));
		itemVendaReposistory.saveAll(venda.getItens());
		
	}
}
