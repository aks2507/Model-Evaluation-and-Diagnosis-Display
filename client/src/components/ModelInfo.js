import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Details from './Details';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    width:"100%",
    margin:"auto",
  },
});

function createData(param, val) {
  return { param, val };
}

export default function ModelInfo(props) {
  const classes = useStyles();
  console.log(props.name);
  let k = props.keys;
  let v = props.values;
  let final_keys = [];
  let final_values = [];
  const rows = [];
  for(let i=0;i<k.length;i++){
    if(v[i])
      v[i] = v[i].toString();
    else
      v[i] = "null";
    if(v[i].length < 20){
      final_keys.push(k[i]);
      final_values.push(v[i]);
    }
  
  }

  for(let i=0;i<final_keys.length;i++){
    rows.push(createData(final_keys[i], final_values[i]));
  }

  return (
    <>
    <div className="row">
      </div>
      <Box m={2} pr={10}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                  <StyledTableCell align="center">Parameter or Attribute</StyledTableCell>
                  <StyledTableCell align="center">Value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.column}>
                  <TableCell align="center">{row.param}</TableCell>
                  <TableCell align="center">{row.val}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
