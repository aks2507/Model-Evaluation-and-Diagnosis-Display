import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModelInfo from '../components/ModelInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop:'3%'
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
  tw:{
      width:'100%'
  }
}));

export default function ModelComparison(props) {
const evalList=props.evaluation;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <h1 style={{color: 'indigo'}}>User specified HyperParamters: </h1>
        {
          evalList.map((evaluation, index) =>
            <div key={index}>
              <h2 style={{color: 'blue'}}>{evaluation.data.model.name}:</h2>
              {Object.keys(evaluation.data.model.metadata.hyperparameters).length === 0 ? (
                <i><h3>All hyperparametrs have default values</h3></i>
              ):(
                <ol>
                  {Object.keys(evaluation.data.model.metadata.hyperparameters).map((key, index) => 
                    <h3>
                      <li key={index}>
                        {key} = {evaluation.data.model.metadata.hyperparameters[key]}
                      </li>
                    </h3>
                  )}
                </ol>
              )}
              
            </div>
        )}
      </div>
      <div className={classes.root}>
        <h1>All HyperParamters: </h1>
        {
          evalList.map((evaluation,index)=>(
              <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"  
                id="panel1bh-header"
              >
                <Typography className={classes.heading}><h4>{evaluation.data.model.name}</h4></Typography>
  
              </AccordionSummary>
              <AccordionDetails>
                <Typography  className={classes.tw}>
        
                    
                    <ModelInfo
                      keys={evaluation.data.model.metadata.keys}
                      values={evaluation.data.model.metadata.values} 
                    />
              
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </div>
  );

}
