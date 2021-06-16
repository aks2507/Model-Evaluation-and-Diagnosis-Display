import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Plot from 'react-plotly.js';

import Details from './Details';

const useStyles = makeStyles({
  table: {
    width:"90%",
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
  console.log(props);

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

      {/* <div className="row">
        <Details
          area={1}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          datasetinfo={props.datasetinfo}
          modelinfo={props.modelinfo}
        />
      </div> */}

      <div className="row">

        <div className="col">
          <Plot
            data={[
              {type: 'bar', x: x, y: y},
            ]}
            layout={ {width: 500, height: 375, title: 'Feature Importance'} }
            config={ {
              scrollZoom:true,
              respnsive:true
            } }
          />
        </div>

        <div className="col">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
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
        </div>

      </div>

    </div>
  );
}
