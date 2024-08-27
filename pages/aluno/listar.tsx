import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { User } from '@/types/user';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from "@mui/material";

export const getServerSideProps = (async () => {
    const res = await fetch(`${process.env['BASE_SERVER']}/user`)
    const users: User[] = await res.json()

    return { props: { users } }
  }) satisfies GetServerSideProps<{ users: User[] }>

const Listar = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Container maxWidth="md">
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Matricula</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) => (
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