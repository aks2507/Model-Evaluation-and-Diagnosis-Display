import React from 'react';
import Details from './Details';
import Plots from '../comparisonComps/Plots';
import DetailsComp from '../comparisonComps/Details';
import GeneralTable from '../comparisonComps/GeneralTable';
import { Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function createData(colname, mean, std, min, max, q25, q50, q75, iqr, mvals) {
  return { colname, mean, std, min, max, q25, q50, q75, iqr, mvals };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '90%',
  },
  paper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
}));

export default function DatasetInfo(props) {
  const classes = useStyles();
  const description = props.datasetinfo.metadata.description;
  const columns = props.datasetinfo.metadata.columns;
  const len = columns.length;

  const x = columns;
  const mean = [];
  const std = [];
  const min = [];
  const q25 = [];
  const q50 = [];
  const q75 = [];
  const max = [];
  const iqr = props.datasetinfo.metadata.iqr;
  const mvals = props.datasetinfo.metadata.missing_values;
  console.log(mvals);

  for (const [key, value] of Object.entries(description)) {
    mean.push(value.mean.toFixed(2));
    std.push(value.std.toFixed(2));
    min.push(value.min.toFixed(2));
    max.push(value.max.toFixed(2));
    q25.push(value['25%'].toFixed(2));
    q50.push(value['50%'].toFixed(2));
    q75.push(value['75%'].toFixed(2));
  }

  const trace = [];
  trace.push({ x: x, y: mean, type: 'scatter', name: 'Mean' });
  trace.push({ x: x, y: std, type: 'scatter', name: 'Standard Deviation' });
  trace.push({ x: x, y: min, type: 'scatter', name: 'Minimum' });
  trace.push({ x: x, y: max, type: 'scatter', name: 'Maximum' });
  trace.push({ x: x, y: q25, type: 'scatter', name: 'First Quartile' });
  trace.push({ x: x, y: q50, type: 'scatter', name: 'Second Quartile' });
  trace.push({ x: x, y: q75, type: 'scatter', name: 'Third Quartile' });

  const data = [...trace];
  const rows = [];
  const headCells = [
    { id: 'colname', label: 'Column' },
    { id: 'mean', label: 'Mean' },
    { id: 'std', label: 'Std Deviation' },
    { id: 'min', label: 'Minimum' },
    { id: 'max', label: 'Maximum' },
    { id: 'q25', label: '1st Quartile' },
    { id: 'q50', label: '2nd Quartile' },
    { id: 'q75', label: '3rd Quartile' },
    { id: 'iqr', label: 'IQR' },
    { id: 'mvals', label: 'Missing Values' },
  ];

  for (let i = 0; i < len; i++) {
    rows.push(
      createData(
        columns[i],
        mean[i],
        std[i],
        min[i],
        max[i],
        q25[i],
        q50[i],
        q75[i],
        iqr[i].toFixed(2),
        mvals[i]
      )
    );
  }

  return (
    <Grid container spacing={2}>
      {props.compare ? (
        props.compare === 1 ? (
          <Grid item xs={12}>
            <Paper elevation={5} className={classes.paper}>
              <DetailsComp evaluations={props.evaluations} />
            </Paper>
          </Grid>
        ) : null
      ) : (
        <Grid item xs={12}>
          <Paper elevation={5} className={classes.paper}>
            <Details
              area={1}
              name={props.name}
              model_type={props.model_type}
              date_created={props.date_created}
              datasetinfo={props.datasetinfo}
              modelinfo={props.modelinfo}
            />
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        {/*Table here*/}
        <Paper elevation={5} className={classes.paper}>
          <Box m={2}>
            <GeneralTable
              rows={rows}
              headCells={headCells}
              tabletitle="Dataset Statistics"
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {/*Plot here*/}
        <Paper elevation={5} className={classes.paper}>
          <Plots data={data} title="Dataset Statistics" />
        </Paper>
      </Grid>
    </Grid>
  );
}
