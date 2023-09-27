import * as c from './styled'; // Importa os estilos do componente
import { gridItemType } from '../../types/gridItemType'; // Importa o tipo gridItemType
import b7Svg from '../../svgs/b7.svg'; // Importa uma imagem SVG
import { items } from '../../data/items'; // Importa os dados dos itens

type Props = {
    item: gridItemType; // Propriedade 'item' que representa o tipo de item na grade
    onClick: () => void; // Função de clique que será chamada quando o componente for clicado
}

export const GridItem = ({ item, onClick }: Props) => {
    return (
        <c.Container 
            shownBackground={item.permanentShown || item.shown}  
            onClick={onClick}
        >
            {/* Renderiza o contêiner com a lógica de fundo exibido */}
            {item.permanentShown === false && item.shown === false &&
                <c.Icon src={b7Svg} alt='' opacity={0.1}/> 
                /* Se o item não foi permanentemente mostrado e não está atualmente mostrado, renderiza um ícone com opacidade reduzida */
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <c.Icon src={items[item.item].icon} alt=''/>
                /* Se o item foi permanentemente mostrado ou está atualmente mostrado e possui um índice válido, renderiza o ícone correspondente ao item */
            }
        </c.Container>
    )
}
