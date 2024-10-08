import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { formatDate } from '@/utils/formatDate'; 
import { Class } from '@/types/class';

function Row(props: { row: Class }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{formatDate(row.start)}</TableCell>
        <TableCell align="right">{formatDate(row.end)}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Presenças
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Matricula</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Hora</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.checkins.map((checkin) => (
                    <TableRow key={checkin.time}>
                      <TableCell component="th" scope="row">
                        {checkin.code}
                      </TableCell>
                      <TableCell>{checkin.name}</TableCell>
                      <TableCell align="right">{formatDate(checkin.time)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function CollapsibleTable({ data }: { data: Class[] }) {
    if(!data.length) return <></>
    
    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Início</TableCell>
                <TableCell align="right">Fim</TableCell>
                <TableCell />
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row) => (
                <Row key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}