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
        {
            evalList.map((evaluation,index)=>(
                <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"  
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}><h4>{evaluation.data.name}</h4></Typography>
    
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
  );

}
