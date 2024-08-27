import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { CollapsibleTable } from "@/components/CollapsibleTable";

import { Class } from '@/types/class';
import { Container } from "@mui/material";

export const getServerSideProps = (async () => {
    const res = await fetch(`${process.env['BASE_SERVER']}/class`)
    const classes: Class[] = await res.json()

    return { props: { classes } }
  }) satisfies GetServerSideProps<{ classes: Class[] }>

const Listar = ({ classes }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Container maxWidth="lg">
            <CollapsibleTable data={classes} />
        </Container>
    )
}

export default Listar;