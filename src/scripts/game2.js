// Função para criar um baralho
function criarBaralho() {
    const naipes = ['Copas', 'Espadas', 'Ouros', 'Paus'];
    const valores = ['Ás', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valete', 'Dama', 'Rei'];
    let baralho = [];
  
    for (let naipe of naipes) {
      for (let valor of valores) {
        baralho.push({ naipe, valor });
      }
    }
  
    return baralho;
  }
  
  // Função para embaralhar o baralho
  function embaralhar(baralho) {
    for (let i = baralho.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
    }
  }
  
  // Função para calcular o valor da mão
  function calcularValor(mao) {
    let valor = 0;
    let possuiAs = false;
  
    for (let carta of mao) {
      if (carta.valor === 'Ás') {
        possuiAs = true;
      }
      valor += obterValorCarta(carta.valor);
    }
  
    if (possuiAs && valor + 10 <= 21) {
      valor += 10; // Contar o Ás como 11, se possível
    }
  
    return valor;
  }
  
  // Função auxiliar para obter o valor de uma carta
  function obterValorCarta(valor) {
    if (['Valete', 'Dama', 'Rei'].includes(valor)) {
      return 10;
    } else if (valor === 'Ás') {
      return 1;
    } else {
      return parseInt(valor, 10);
    }
  }
  
  // Função para jogar uma rodada
  function jogarRodada() {
    const baralho = criarBaralho();
    embaralhar(baralho);
  
    const maoJogador = [baralho.pop(), baralho.pop()];
    const maoDealer = [baralho.pop(), baralho.pop()];
  
    console.log('Sua mão: ', maoJogador);
    console.log('Carta do Dealer: ', maoDealer[0]);
  
    // Verifica se o jogador tem blackjack
    if (calcularValor(maoJogador) === 21) {
      console.log('Blackjack! Você venceu!');
      return;
    }
  
    // Loop para as decisões do jogador
    while (true) {
      const decisao = prompt('Deseja pedir uma carta? (s/n): ');
  
      if (decisao.toLowerCase() === 's') {
        const novaCarta = baralho.pop();
        maoJogador.push(novaCarta);
        console.log('Nova carta: ', novaCarta);
        console.log('Sua mão: ', maoJogador);
  
        // Verifica se o jogador ultrapassou 21
        if (calcularValor(maoJogador) > 21) {
          console.log('Estourou! Você perdeu.');
          return;
        }
      } else {
        break;
      }
    }
  
    // Vez do dealer
    console.log('Mão do Dealer: ', maoDealer);
  
    while (calcularValor(maoDealer) < 17) {
      const novaCartaDealer = baralho.pop();
      maoDealer.push(novaCartaDealer);
      console.log('Nova carta do Dealer: ', novaCartaDealer);
      console.log('Mão do Dealer: ', maoDealer);
    }
  
    // Determina o vencedor
    const valorJogador = calcularValor(maoJogador);
    const valorDealer = calcularValor(maoDealer);
  
    console.log('Sua mão: ', maoJogador, ' - Valor: ', valorJogador);
    console.log('Mão do Dealer: ', maoDealer, ' - Valor: ', valorDealer);
  
    if (valorJogador > valorDealer || valorDealer > 21) {
      console.log('Você venceu!');
    } else if (valorJogador < valorDealer) {
      console.log('Você perdeu.');
    } else {
      console.log('Empate!');
    }
  }
  
  // Inicia o jogo
  jogarRodada();
  