import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    width: '100%',
    margin: 'auto',
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
  for (let i = 0; i < k.length; i++) {
    if (v[i]) v[i] = v[i].toString();
    else v[i] = 'null';
    if (v[i].length < 20) {
      final_keys.push(k[i]);
      final_values.push(v[i]);
    }
  }

  for (let i = 0; i < final_keys.length; i++) {
    rows.push(createData(final_keys[i], final_values[i]));
  }

  return (
    <div>
      {props.standalone === 0 ? null : (
        <div>
          <h2>User Specified hyperparameters: </h2>
          <h3 style={{ color: 'blue' }}>{props.modelName}:</h3>
          {props.hyperparameters == null ||
          Object.keys(props.hyperparameters).length === 0 ? (
            <i>
              <h4>All hyperparametrs have default values</h4>
            </i>
          ) : (
            <ol>
              {Object.keys(props.hyperparameters).map((key, index) => (
                <h4>
                  <li key={index}>
                    {key} = {props.hyperparameters[key]}
                  </li>
                </h4>
              ))}
            </ol>
          )}
        </div>
      )}

      <div>
        <h2>All hyperparameters: </h2>
        <Paper elevation={5}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Parameter or Attribute
                  </StyledTableCell>
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
        </Paper>
      </div>
    </div>
  );
}
