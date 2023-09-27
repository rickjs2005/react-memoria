import React, { useEffect, useState } from 'react'; // Importa o React, useEffect e useState
import * as C from './app.styled'; // Importa os estilos do app.styled e os renomeia como C
import LogoImage from './assets/devmemory_logo.png'; // Importa a imagem do logo
import RestartIcon from './svgs/restart.svg'; // Importa o ícone de reiniciar
import { InfoItem } from './components/InfoItem'; // Importa o componente InfoItem
import { Button } from './components/Button'; // Importa o componente Button
import { GridItem } from './components/GridItem'; // Importa o componente GridItem
import { gridItemType } from './types/gridItemType'; // Importa o tipo gridItemType
import { items } from './data/items'; // Importa os dados dos itens
import { formatTimeElapsed } from './helpers/formatTimeElapsed'; // Importa a função para formatar o tempo

const App = () => {
  // Define um estado 'playing' e uma função 'setPlaying' para controlar se o jogo está em andamento ou não (false indica que não está jogando).
  const [playing, setPlaying] = useState<boolean>(false); 
  
  // Define o tempo percorrido do jogo 'timeElapsed' e uma função 'setTimeElapsed' para indicar o tempo (começando do zero).
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  
  // Define quantos movimentos já foram feitos 'moveCount' e uma função 'setMoveCount' para controlar os movimentos (0 indica que não foi feito nenhum).
  const [moveCount, setMoveCount] = useState<number>(0);
  
  // Define a quantidade de itens mostrados "gridItems" e uma função 'setGridItems' para controlar os itens mostrados (0 indica para começar mostrando nenhum).
  const [gridItems, setGridItems] = useState<gridItemType[]>([]);
  
  // Define o primeiro item selecionado "firstSelectedIndex" e uma função 'setFirstSelectedIndex' para controlar qual primeiro item selecionado (null indica que nenhum foi selecionado).
  const [firstSelectedIndex, setFirstSelectedIndex] = useState<number | null>(null);

  useEffect(() => resetAndCreateGrid(), []); // Este useEffect será executado para resetar o jogo e criar uma nova grade de itens.

  useEffect(() => {
  // Este useEffect será executado sempre que o estado 'playing' mudar.

  if (playing) {
    // Se o jogo estiver em andamento (playing é true), então:
    const timer = setInterval(() => {
      // Configura um intervalo que irá incrementar o tempo elapsed a cada segundo.
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => {
      // Quando o componente é desmontado ou o estado 'playing' muda para false,
      // este retorno de função é executado, o que limpa o intervalo do timer.
      clearInterval(timer);
    };
  }
}, [playing]);

 const handleItemClick = (index: number) => {
  // Verifica se o jogo está em andamento e se o item clicado ainda não foi revelado.
  if (playing && gridItems[index].shown === false) {
    // Cria uma cópia temporária da grade de itens para fazer modificações.
    let tmpGrid = [...gridItems];
    // Marca o item como revelado na cópia temporária.
    tmpGrid[index].shown = true;
    // Atualiza o estado com a nova grade de itens.
    setGridItems(tmpGrid);

    // Verifica se é o primeiro item selecionado.
    if (firstSelectedIndex === null) {
      setFirstSelectedIndex(index);
    } else {
      // Compara os itens selecionados.
      if (tmpGrid[firstSelectedIndex].item === tmpGrid[index].item) {
        tmpGrid[firstSelectedIndex].permanentShown = true;
        tmpGrid[index].permanentShown = true;
      } else {
        // Caso os itens não sejam iguais, aguarda 1 segundo e então os esconde novamente.
        setTimeout(() => {
          tmpGrid[firstSelectedIndex].shown = false;
          tmpGrid[index].shown = false;
          // Atualiza o estado com a nova grade de itens.
          setGridItems(tmpGrid);
        }, 1000);
      }
      // Reseta o índice do primeiro item selecionado e incrementa o contador de movimentos.
      setFirstSelectedIndex(null);
      setMoveCount(prev => prev + 1);
    }
  }
};

  const resetAndCreateGrid = () => { // Função para resetar o jogo e criar uma nova grade de itens.
    setTimeElapsed(0); // Reseta o tempo percorrido para 0.
    setMoveCount(0); // Reseta o contador de movimentos para 0.
    setFirstSelectedIndex(null); //  Reseta o índice do primeiro item selecionado para null (nenhum item selecionado).

// Cria uma matriz temporária vazia para representar a grade do jogo.
let tmpGrid: gridItemType[] = [];
// Adiciona elementos vazios à matriz temporária, inicialmente nenhum item é exibido ou permanente.
for (let i = 0; i < items.length * 2; i++) {
  tmpGrid.push({ item: null, shown: false, permanentShown: false }); 
}

for (let w = 0; w < 2; w++) {// Este loop executa duas vezes para garantir que cada item tenha duas cópias no jogo.
  for (let i = 0; i < items.length; i++) { // Loop que percorre todos os itens disponíveis.
    let pos = -i; // Inicializa 'pos' com um valor inválido.
    // Encontra uma posição aleatória que ainda não tenha um item atribuído.
    while (pos < 0 || tmpGrid[pos].item !== null) { 
      pos = Math.floor(Math.random() * (items.length * 2));
    }
    tmpGrid[pos].item = i; // Atribui o item à posição encontrada.
  }
}

setGridItems(tmpGrid);// Atualiza o estado 'gridItems' com a nova matriz temporária, representando a nova grade do jogo.
setPlaying(true);// Define o estado 'playing' como true, indicando que o jogo está em andamento.
};

  useEffect(() => {// Este useEffect será executado sempre que 'moveCount' ou 'gridItems' mudar.
    if (moveCount > 0 && gridItems.every(item => item.permanentShown === true)) { // Verifica se houve movimentos (moveCount > 0) e se todos os itens foram permanentemente mostrados.
      setPlaying(false);// Se ambas as condições forem verdadeiras, define o estado 'playing' como false, indicando que o jogo terminou.
    }
  }, [moveCount, gridItems]);// Este useEffect será acionado sempre que 'moveCount' ou 'gridItems' mudar.

  return (
    // componente retorna estrutura da minha aplicação.
    <C.Container> {/* Container principal */}
      <C.Info> {/* Área de informações */}
        <C.LogoLink href=""> {/* Link do logo */}
          <img src={LogoImage} width="200" alt="" /> {/* Link do logo */}
        </C.LogoLink>
        <C.InfoArea> {/* Área de informações */}
          <InfoItem label='tempo' value={formatTimeElapsed(timeElapsed)}></InfoItem>{/* Exibe o tempo decorrido */}
          <InfoItem label='movimentos' value={moveCount.toString()}></InfoItem>{/* Exibe o número de movimentos */}
        </C.InfoArea>
        <Button label='reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />{/* Botão para reiniciar o jogo */}
      </C.Info>
      <C.GridArea> {/* Área da grade */}
        <C.Grid> {/* A própria grade */}
          {gridItems.map((item, index) => (  // Mapeia cada item da grade
            <GridItem // Renderiza um componente GridItem
              key={index}// A propriedade 'key' é usada pelo React para identificar elementos de forma única na lista.
              item={item}  // A propriedade 'item' é passada para o componente GridItem para representar o item atual na iteração do mapa.
              onClick={() => handleItemClick(index)}  
              // A propriedade 'onClick' define o que acontece quando o GridItem é clicado. Neste caso, ele chama a função 'handleItemClick' passando o índice como argumento.
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
