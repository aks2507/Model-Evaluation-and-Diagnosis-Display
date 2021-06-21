import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';
// import Details from './Details';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    align:"right"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function ROC_Prec_Recall(props){
  const x = props.x;
  const y = props.y;
  // console.log(props);

  let plot_title = props.curve === 0 ? "ROC Curve":"Precision-Recall Curve";
  const classes = useStyles();
  var auc=props.auc.toFixed(2);
  return(
    <div>
      {/* <div className="row">
        <Details
          area={0}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          area_under_curve={props.auc}
          datasetinfo={props.datasetinfo}
          modelinfo={props.modelinfo}
        />
      </div> */}

      <div className="col">
      <div className={classes.root}>
        <Box ml={8}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Area Under Curve</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {auc}
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
    </div>
          <div>
          <Plot className={classes.plot}
            data={[
              {type: 'scatter', x: x, y: y},
            ]}
            layout={ {width: 500, height: 405, title: plot_title,align:'right'} }
            config={ {
              scrollZoom:true,
              respnsive:true
            } }
          />
        </div>
      </div>
    

    </div>
  );
}
