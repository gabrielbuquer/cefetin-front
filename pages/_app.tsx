import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { styled } from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  height: 100%;
  flex: 1;
  background-color: #f0f0f0;
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0;
`;



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CEFET-IN</title>
        <meta name="description" content="Sistema de gestão de presença para alunos do CEFET-RJ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
      
      <Header />
      <Content>
        <StyledContainer maxWidth="lg">
          <Component {...pageProps} />
        </StyledContainer>
      </Content>
    </Main>
    </>
    
  );
}
