import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Plot from 'react-plotly.js';
import TableHead from '@material-ui/core/TableHead';
import { Grid } from '@material-ui/core';

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
  plot: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
  },
  tableContainer: {
    width: '90%',
  },
});

function createData(column, score) {
  return { column, score };
}

export default function FeatureImp(props) {
  const rows = [];
  const x = [];
  const y = [];

  let i;
  for (i = 0; i < props.feature_scores.length; i++) {
    rows.push(createData(props.columns[i], props.feature_scores[i].toFixed(2)));
    x.push(props.columns[i]);
    y.push(props.feature_scores[i]);
  }

  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.tableContainer}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={5}>
          <Plot
            className={classes.plot}
            data={[{ type: 'bar', x: x, y: y }]}
            layout={{
              title: 'Feature Importance',
              legend: { orientation: 'h' },
            }}
            config={{
              scrollZoom: true,
              responsive: true,
            }}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation={5}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Feature</StyledTableCell>
                  <StyledTableCell align="center">
                    Feature Score
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.column}>
                    <TableCell align="center">{row.column}</TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
