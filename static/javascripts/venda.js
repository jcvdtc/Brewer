Brewer.Venda = (function() {
	
	function Venda(tabelaItens) {
		this.tabelaItens = tabelaItens;
		this.valorTotalBox = $('.js-valor-total-box');
		this.valorTotalBoxContainer = $('.js-valor-total-box-container');
		this.valorFreteInput = $('#valorFrete');
		this.valorDescontoInput = $('#valorDesconto');
		
		this.valorTotalItens = String(this.tabelaItens.valorTotal()) === 'undefined' ? '0' : this.tabelaItens.valorTotal();
		this.valorTotalFrete = String(this.valorFreteInput.data('valor')) === 'undefined' ? '0' : this.valorFreteInput.data('valor');
		this.valorTotalDesconto = String(this.valorDescontoInput.data('valor')) === 'undefined' ? '0' : this.valorDescontoInput.data('valor');
	}
	
	Venda.prototype.iniciar = function() {
		this.tabelaItens.on('tabela-itens-atualizada', onTabelaItensAtualizada.bind(this));
		this.valorFreteInput.on('keyup', onValorFreteAlterado.bind(this));
		this.valorDescontoInput.on('keyup', onValorDescontoAlterado.bind(this));

		this.tabelaItens.on('tabela-itens-atualizada', onValoresAlterados.bind(this));
		this.valorFreteInput.on('keyup', onValoresAlterados.bind(this));
		this.valorDescontoInput.on('keyup', onValoresAlterados.bind(this));
		
		onValoresAlterados.call(this);
	}
	
	function onTabelaItensAtualizada(evento, valorTotalItens) {
		this.valorTotalItens = (valorTotalItens == null ? 0 : valorTotalItens);
	}
	
	function onValorFreteAlterado(evento) {
		this.valorTotalFrete = Brewer.recuperarValor($(evento.target).val());
	}
	
	function onValorDescontoAlterado(evento) {
		this.valorTotalDesconto = Brewer.recuperarValor($(evento.target).val());
	}
	
	function onValoresAlterados() {
		var valorTotal = Number(this.valorTotalItens) + Number(this.valorTotalFrete) - Number(this.valorTotalDesconto);
		this.valorTotalBoxContainer.toggleClass('bw-valor-negativo-venda', valorTotal < 0);
		
		this.valorTotalBox.html(Brewer.formatarMoeda(valorTotal));
	}
	
	return Venda;
	
}());


$(function() {
	var autocomplete = new Brewer.Autocomplete();
	autocomplete.iniciar();
	
	var tabelaItens = new Brewer.TabelaItens(autocomplete);
	tabelaItens.iniciar();
	
	var venda = new Brewer.Venda(tabelaItens);
	venda.iniciar();
})