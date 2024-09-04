import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { User } from '@/types/user';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

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
        const res = await fetch(`${process.env['BASE_SERVER']}/user`)
        const users: User[] = await res.json()

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        return { props: { users } }
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return { props: { users: [] } }
    }
  }) satisfies GetServerSideProps<{ users: User[] }>

const Listar = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [data, setData] = useState<User[]>(users);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user`);
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const newUsers: User[] = await res.json();
            setData(newUsers);
        } catch (error) {
            console.error('Failed to refetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Header>
                <h1>Usuários</h1>
                <Button variant="outlined" onClick={fetchUsers} disabled={loading}>
                    {loading ? 'Carregando' : 'Atualizar'}
                </Button>
            </Header>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Matricula</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.code}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Listar;