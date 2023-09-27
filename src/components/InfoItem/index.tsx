import * as c from './styled'; // Importa os estilos do componente

type Props = {
    label: string; // Propriedade que representa o rótulo do item de informação
    value: string; // Propriedade que representa o valor associado ao rótulo
}

export const InfoItem = ({ label, value }: Props) => {
    return (
        <c.Container>
            {/* Renderiza um contêiner com os estilos do componente */}
            <c.Label>{label}</c.Label>
            {/* Renderiza o rótulo do item de informação */}
            <c.Value>{value}</c.Value>
            {/* Renderiza o valor associado ao rótulo */}
        </c.Container>
    )
}
