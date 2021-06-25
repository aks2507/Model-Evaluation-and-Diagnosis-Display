import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';
import Details from './Details';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CMatrixTable from './CMatrixTable';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  plot: {
    width:"90%",
    margin:"auto",
    alignItems: "center",
    justifyContent: "center",
  },
}));


export default function Confusion_matrix(props){
  let z = props.cmatrix;
  const x = [];
  const y = [];
  let i;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  for(i=0;i<props.cmatrix.length;i++)
  {
    let k = props.cmatrix.length - i - 1;
    let c2 = "Class: "+k;
    x.push(c2);
    y.push(c2);
  }
  x.reverse();
  let n=z.length;
  let m=z.length;
  let cmatrix=[];
  for(i=0;i<n;i++){
    let k=[];
    for(let j=0;j<m;j++) k.push(0);
    cmatrix.push(k);
  }

  n=z.length;
  m=z.length;
  for(i=0;i<n;i++)
  {
    for(let j=0;j<m;j++)
    {
      cmatrix[i][j]=z[n-i-1][j];
    }
  }

  const classes = useStyles();
  return(
    <>
     <Details
          area={1}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          datasetinfo={props.datasetinfo}
          modelinfo={props.modelinfo}
        />
    <div className={classes.root}>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>Confusion Matrix Table</Typography>
        <Typography className={classes.secondaryHeading} >Tabular View</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
           <CMatrixTable matrix={z}></CMatrixTable>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2bh-content"
        id="panel2bh-header"
      >
        <Typography className={classes.heading}>Confusion Matrix Heatmap</Typography>
        <Typography className={classes.secondaryHeading}>
          Heatmap view
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        <div className="row">
        <Box ml={20}>
            <Plot className={classes.plot}
              data={[
                {type: 'heatmap', x: x, y: y, z: cmatrix},
              ]}
              layout={ {width: 500, height: 450, title: "Confusion Matrix"} }
              config={ {
                scrollZoom:true,
                respnsive:true
              } }
            />
        </Box>
       
      </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  </div>
    </>
  );
}
