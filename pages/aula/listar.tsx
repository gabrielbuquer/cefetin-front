import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { CollapsibleTable } from "@/components/CollapsibleTable";

import { Class } from '@/types/class';
import { Button, Container } from "@mui/material";
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 28px;
        color: #005A9C;
        font-weight: 500;
    }
`;

export const getServerSideProps = (async () => {
    try {
        const res = await fetch(`${process.env['BASE_SERVER']}/class`)
        const classes: Class[] = await res.json()

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        return { props: { classes } }
    } catch(error) {
        console.error('Failed to fetch classes:', error);
        return { props: { classes: [] } };
    }
    
  }) satisfies GetServerSideProps<{ classes: Class[] }>

const Listar = ({ classes }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [data, setData] = useState<Class[]>(classes);
    const [loading, setLoading] = useState(false);

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/class`);
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const newClasses: Class[] = await res.json();
            setData(newClasses);
        } catch (error) {
            console.error('Failed to refetch classes:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Header>
                <h1>Aulas</h1>
                <Button variant="outlined" onClick={fetchClasses} disabled={loading}>
                    {loading ? 'Carregando' : 'Atualizar'}
                </Button>
            </Header>
            <CollapsibleTable data={data} />
        </Container>
    )
}

export default Listar;