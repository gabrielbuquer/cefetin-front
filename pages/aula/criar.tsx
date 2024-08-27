import { useState } from "react";
import { Button, TextField, Paper, Grid, Alert } from "@mui/material";
import { Container } from "@mui/material";

type AlertType = {
    message: string;
    severity: "success" | "info" | "warning" | "error";
}

const Criar = () => {
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [alert, setAlert] = useState<AlertType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setName("");
        setStart("");
        setEnd("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !start || !end) {
            setAlert({ message: "Todos os campos são obrigatórios", severity: "warning" });
            return;
        }

        setIsLoading(true);

        const data = { name, start, end };

        try {
            const response = await fetch(`/api/class`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                mode: "cors",
                credentials: "include",
            });

            if (response.ok) {
                setAlert({ message: "Aula criada com sucesso", severity: "success" });
                resetForm();
            } else {
                const errorData = await response.json();
                setAlert({ message: errorData.message || "Erro ao criar aula", severity: "error" });
            }
        } catch (error: any) {
            setAlert({ message: "Erro ao criar aula: " + error.message, severity: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px" }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                fullWidth
                                size="small"
                                focused
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Início"
                                type="datetime-local"
                                value={start}
                                onChange={(event) => setStart(event.target.value)}
                                fullWidth
                                size="small"
                                focused
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fim"
                                type="datetime-local"
                                value={end}
                                onChange={(event) => setEnd(event.target.value)}
                                fullWidth
                                size="small"
                                focused
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                {isLoading ? "Criando..." : "Criar aula"}
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

export default Criar;
