import * as C from './styled';

type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick}: Props) => {
    return (
        <C.Container onClick={onClick}>
            {/* Renderiza um contêiner que, quando clicado, chama a função 'onClick' passada como propriedade. */}
            {icon &&
                <C.IconArea>
                    {/* Se houver um ícone, renderiza uma área para o ícone. */}
                    <C.Icon src={icon}></C.Icon>
                    {/* Renderiza o ícone. */}
                </C.IconArea>
            }
            <C.Label>{label}</C.Label>
            {/* Renderiza o rótulo (label) do botão. */}
        </C.Container>
    )
}
