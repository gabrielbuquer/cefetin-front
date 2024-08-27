import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { UnckeckedUser } from '@/types/user';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, IconButton, Drawer, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { use, useState } from "react";
import { FormUser } from "@/components/FormUser";
import { useRouter } from "next/router";

export const getServerSideProps = (async () => {
    const res = await fetch(`${process.env['BASE_SERVER']}/uncheck-user`)
    const users: UnckeckedUser[] = await res.json()

    return { props: { users } }
  }) satisfies GetServerSideProps<{ users: UnckeckedUser[] }>

const Criar = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const [userToRegister, setUserToRegister] = useState<UnckeckedUser | null>(null);
    const handleUser = async (user: UnckeckedUser) => {
        setUserToRegister(user);
    }

    const handleDrawerClose = () => {
        setUserToRegister(null);
        router.push(router.asPath);
    }

    return (
        <Container maxWidth="md">
            {!users.length ? (
                <Paper style={{padding: "40px"}}>
                <Typography variant="h5" align="center">
                    Não há usuários para registrar.
                </Typography>
            </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Id do Usuário</TableCell>
                            <TableCell>Id do dispositivo</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.deviceId}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="Adicionar usuário" size="large" onClick={() => handleUser(user)}>
                                        <AddCircleOutlineIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            
            {userToRegister && (
                <Drawer
                    anchor="right"
                    open={userToRegister !== null}
                    onClose={handleDrawerClose}
                    style={{padding: "20px"}}
                >
                    <FormUser user={userToRegister} />
                </Drawer>
            )}
            
        </Container>
    )
}

export default Criar;