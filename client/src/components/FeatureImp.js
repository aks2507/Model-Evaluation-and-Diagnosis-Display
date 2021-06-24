import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Plot from 'react-plotly.js';
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

function createData(column, score) {
  return { column, score };
}

export default function FeatureImp(props){
  const rows = [];
  const x = [];
  const y = [];


  let i;
  for(i=0;i<props.feature_scores.length;i++)
  {
      rows.push(createData(props.columns[i],props.feature_scores[i].toFixed(2)));
      x.push(props.columns[i]);
      y.push(props.feature_scores[i]);
  }

  const classes = useStyles();
  return(
    <div>

      <div className="row">

        <div className="col">
          <Plot
            data={[
              {type: 'bar', x: x, y: y},
            ]}
            layout={ {width: 500, height: 500, title: 'Feature Importance'} }
            config={ {
              scrollZoom:true,
              respnsive:true
            } }
          />
        </div>

        <div className="col">
          <Box m={2} pr={10}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                      <StyledTableCell align="center">Feature</StyledTableCell>
                      <StyledTableCell align="center">Feature Score</StyledTableCell>
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
          </Box>
        </div>

      </div>

    </div>
  );
}
