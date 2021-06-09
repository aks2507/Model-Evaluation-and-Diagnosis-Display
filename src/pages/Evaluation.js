import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function Evaluation(){
  const classes = useStyles();

  const [evaluators, setEvaluators] = React.useState([]);

  const decideEvaluators = (model_type) => {
    if(model_type == "regression") {
      setEvaluators(["Metrics"]);
    }
    else {
      setEvaluators(["Metrics","ROC-AUC Curve","Precision-Recall Curve","Confusion Matrix"]);
    }

    return evaluators;
  };

  return(
    <div className={classes.root}>
      <SideBar evaluators = {decideEvaluators("regression")} />
        <div className={classes.drawerHeader} />
    </div>
  );
}

export default Evaluation;
