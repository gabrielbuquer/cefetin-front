import { useState } from "react";
import { Button, TextField, Paper, Grid, Alert } from "@mui/material";
import { UnckeckedUser } from "@/types/user";
import { Container } from "./FormUser.styled";

type Props = {
  user: UnckeckedUser;
};

type AlertType = {
    message: string;
    severity: "success" | "info" | "warning" | "error";
}

export const FormUser = ({ user }: Props) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [alert, setAlert] = useState<AlertType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setName("");
        setCode("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !code) {
            setAlert({ message: "Todos os campos são obrigatórios", severity: "warning" });
            return;
        }

        setIsLoading(true);

        const data = {"uncheck-user-id": user.id, name, code };

        try {
            const response = await fetch(`/api/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                mode: "cors",
                credentials: "include",
            });

            if (response.ok) {
                setAlert({ message: "Aluno criado com sucesso", severity: "success" });
                resetForm();
            } else {
                const errorData = await response.json();
                setAlert({ message: errorData.message || "Erro ao criar aluno", severity: "error" });
            }
        } catch (error: any) {
            setAlert({ message: "Erro ao criar aluno: " + error.message, severity: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={12}>
                            <TextField
                                label="Nome"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                fullWidth
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <TextField
                                label="Matrícula"
                                value={code}
                                onChange={(event) => setCode(event.target.value)}
                                fullWidth
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                {isLoading ? "Registrando..." : "Registrar aluno"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            {alert && (
                <Alert variant="filled" severity={alert.severity} style={{ marginTop: "20px" }} aria-live="polite">
                    {alert.message}
                </Alert>
            )}
        </Container>
    );
};
