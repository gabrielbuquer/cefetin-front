
import styled from "styled-components";
import BasicMenu from "../BasicMenu/BasicMenu"
import { Title, Box, MenuWrapper } from "./Header.styled"

const Link = ({ className, children }: any) => (
    <a className={className}>
      {children}
    </a>
  );
  
  const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
  `;

export const Header = () => {
    return (
      <Box maxWidth='lg'>
        <Title variant="h1">CEFET-IN</Title>
        
        <MenuWrapper>
            <BasicMenu title="Aulas" options={[{ title: 'Cadastrar', href: '/aula/criar'}, { title: 'Listar', href: '/aula/listar'}]}/>
            <BasicMenu title="Alunos" options={[{ title: 'Cadastrar', href: '/aluno/criar'}, { title: 'Listar', href: '/aluno/listar'}]}/>
        </MenuWrapper>
      </Box>
    )
}