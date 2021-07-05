import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import {Typography, Paper, Box} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModelInfo from '../components/ModelInfo';
import GeneralTable from '../comparisonComps/GeneralTable';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: '3%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  tw: {
    width: '100%',
  },
}));

function createData(model, hyperparameters) {
  return { model, ...hyperparameters };
}

export default function ModelComparison(props) {
  const userDefinedHyperparametersList = new Set();
  const evalList = props.evaluation;
  const len = evalList.length;

  // getting the union of all user defined hyperparameters
  for(let i=0;i<len;i++){
    if(evalList[i].data.model.metadata.hyperparameters == null ||
      Object.keys(evalList[i].data.model.metadata.hyperparameters).length === 0)
        continue;
    for(let j=0;j<Object.keys(evalList[i].data.model.metadata.hyperparameters).length;j++){
      userDefinedHyperparametersList.add(Object.keys(evalList[i].data.model.metadata.hyperparameters)[j]);
    }
  }
  
  //Setting up HeadCells of the table
  const headCells = [];
  headCells.push({id:'model', label:'Model'});
  let userDefinedHyperparametersArray = [...userDefinedHyperparametersList];
  for(let i=0; i< userDefinedHyperparametersArray.length; i++){
    headCells.push({
      id: i,
      label: userDefinedHyperparametersArray[i]
    });
  }

  // Setting up rows of the table
  const rows=[];
  for(let i=0;i<len;i++){
    let tempRowValuesList = [];
    if(evalList[i].data.model.metadata.hyperparameters == null ||
    Object.keys(evalList[i].data.model.metadata.hyperparameters).length === 0){
      for(let j=0;j<userDefinedHyperparametersArray.length;j++)
        tempRowValuesList.push(null);
    }
    else{
      for(let j=0;j<userDefinedHyperparametersArray.length;j++){
        tempRowValuesList.push(null);
      }
      for(const [key, value] of Object.entries(evalList[i].data.model.metadata.hyperparameters)){
        let columnId = headCells.filter((headCell) => headCell.label === key).map(headCell => headCell.id)[0];
        // console.log(columnId);
        if(value == null || value === true || value === false)
          tempRowValuesList[columnId] = String(value);
        else
          tempRowValuesList[columnId] = value;
      }
      for(let j=0;j<evalList[i].data.model.metadata.keys.length;j++){
        let column = headCells.filter((headCell) => headCell.label === evalList[i].data.model.metadata.keys[j])
        let columnID = column?(column.map(headCell => headCell.id)[0]):-1;
        if(columnID>0){
          if(evalList[i].data.model.metadata.values[j] == null || 
          evalList[i].data.model.metadata.values[j] === true || 
          evalList[i].data.model.metadata.values[j] === false)
            tempRowValuesList[columnID] = String(evalList[i].data.model.metadata.values[j]);
          else
            tempRowValuesList[columnID] = evalList[i].data.model.metadata.values[j];
        }

      } 
    }
    // console.log(tempRowValuesList);
    rows.push(createData(evalList[i].data.model.name, tempRowValuesList));
  }
  console.log(headCells, rows);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Paper elevation={5}>
          <Box m={2}>
            <GeneralTable 
              rows={rows}
              headCells={headCells}
              tabletitle="User Specified Hyperparameters"
            />
          </Box>
        </Paper>
        
      </div>
      <div className={classes.root}>
        <h1>All HyperParamters: </h1>
        {evalList.map((evaluation, index) => (
          <Accordion
            expanded={expanded === 'panel' + index}
            onChange={handleChange('panel' + index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                <h4>{evaluation.data.model.name}</h4>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.tw}>
                <ModelInfo
                  standalone={1}
                  keys={evaluation.data.model.metadata.keys}
                  values={evaluation.data.model.metadata.values}
                  hyperparameters={evaluation.data.model.metadata.hyperparameters}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
