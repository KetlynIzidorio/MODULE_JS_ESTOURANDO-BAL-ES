//Variavel que armazena a chamada da função timeout
var timeId=null;

function iniciaJogo(){
	alert('Jogo Iniciado');
	var url = window.location.search;
	
	//O Replace pega o caracter e substitui
	var nivel = url.replace("?","");

	var tempo_segundos = 0;


	//1 fácil -> 120 segundos
	if (nivel == '1')
	{
		tempo_segundos = 120;
	}

	//2 médico -> 60 segundos
	if (nivel == '2')
	{
		tempo_segundos = 60;
	}

	//3 difícil -> 30segundos
	if (nivel == '3')
	{
		tempo_segundos = 30;
	}


	//Inserindo segundos no span
	//INNER HTML Insere um conteudo dentro da tag
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//Quantidade de balões
	var qtde_baloes =60;

	cria_baloes(qtde_baloes);

	//Imprimir quantidade de baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	//Imprimir quantidade de baloes estourados
	document.getElementById('baloes_estourados').innerHTML = 0;
	
	contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos){
	
	segundos = segundos -1;

	if(segundos == -1)
	{
		//Para a execução da função setTimeout
		clearTimeout(timerId);
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	//Executa a função a cada milisegundos
	timerId = setTimeout("contagem_tempo("+segundos+")",1000);

}

function game_over()
{
	remove_eventos_baloes();
	alert('Fim de jogo');
}

function cria_baloes(qtde_baloes)
{
	for ( var i=1; i <=qtde_baloes; i++){

		//createElement consegue criar um elemento dentro da tag
		var balao = document.createElement("img");
		balao.src='imagens/balao_azul_pequeno.png';
		//Margem entre os baloes
		balao.style.margin = '12px';
		//Cria um ID para cada elemento
		balao.id='b'+i;

		balao.onclick = function(){estourar(this);};

		//appendChild coloca as tag img dentro do elemento div
		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){
	var id_balao = e.id;
	//Limpar o evento de onclick da função, para n estourar mais de 1vez o mesmo balão
	document.getElementById(id_balao).setAttribute("onclick",""); 
	//Altera a imagem do balão qdo clicado
	document.getElementById(id_balao).src='imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);


}

function pontuacao(acao){
	//Recuperando valor textual
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
	//Transformando em valores inteiros
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	//Recebe ele mesmo -1
	baloes_inteiros = baloes_inteiros + acao;
	//Recebe ele mesmo +1
	baloes_estourados = baloes_estourados - acao;	

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
	if (baloes_inteiros == '0'){
		alert('Parabéns, vc conseguiu estourar todos os balões a tempo');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}
