import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    margin: "auto",
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Details(props) {
    let evalList = props.evaluations;
    let c=props.c;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {
              c===0 ?(
                evalList.map((evaluation, index) => 
                <Tab key={index}
                label={evaluation.data.dataset.name} {...a11yProps(index)} />)
              ):(
                evalList.map((evaluation, index) => 
                <Tab key={index}
                label={evaluation.data.name} {...a11yProps(index)} />)
              )
              }
            </Tabs>
          </div>
      </AppBar>
        
          <div>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
                {evalList.map((evaluation, idx) => 
                  <TabPanel key={idx} value={value} index={idx} dir={theme.direction}>



                     <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                        <Typography className={classes.heading}><h4>Evaluation Info</h4></Typography>
                        </AccordionSummary>
                         <AccordionDetails>
                          <Typography>
                          
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col">
                                <p><strong>Name: </strong>{evaluation.data.name}</p>
                              </div>
                              <div className="col">
                                <p><strong>Model Type: </strong>{evaluation.data.model_type}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <p><strong>Status: </strong></p>
                              </div>
                              <div className="col">
                                <p><strong>Date Created: </strong>{evaluation.data.date_created}</p>
                              </div>
                            </div>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                   
                      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}> <h4>Dataset Info</h4></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         
                      <div className="row">
                        <div className="col">
                          <p><strong>Dataset: </strong>{evaluation.data.dataset.name}</p>
                        </div>
                        <div className="col">
                          <p><strong>Rows, Columns </strong>{evaluation.data.dataset.metadata.number_of_rows}, {evaluation.data.dataset.metadata.number_of_columns}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><strong>Dataset size: </strong>{evaluation.data.dataset.metadata.memory} bytes</p>
                        </div>
                        <div className="col">
                          <p><strong>Author: </strong>{evaluation.data.dataset.metadata.author}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><strong>Label: </strong>{evaluation.data.dataset.metadata.label}</p>
                        </div>
                        <div className="col">
                          <p><strong>Dataset Split method: </strong>{evaluation.data.dataset.metadata.dataset_split_method}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><strong>Number of Duplicates, Outliers: </strong>{evaluation.data.dataset.metadata.number_of_duplicates}, {evaluation.data.dataset.metadata.number_of_outliers}</p>
                        </div>
                        <div className="col">
                          <p><strong>Date Created: </strong>{evaluation.data.dataset.date_created}</p>
                        </div>
                      </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

                     
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>  <h4>Model Info </h4></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        
                      <div className="row">
                        <div className="col">
                          <p><strong>Name: </strong>{evaluation.data.model.name}</p>
                        </div>
                        <div className="col">
                          <p><strong>Date Created: </strong>{evaluation.data.model.date_created}</p>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col">
                          <p><strong>Model used: </strong>{evaluation.data.model.metadata.model}</p>
                        </div>
                        <div className="col">
                          <p><strong>Algorithm: </strong>{evaluation.data.model.metadata.algorithm}</p>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col">
                          <p><strong>Library used: </strong>{evaluation.data.model.metadata.library}</p>
                        </div>
                        <div className="col">
                          <p><strong>Library version: </strong>{evaluation.data.model.metadata.library_version}</p>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col">
                          <p><strong>Author: </strong>{evaluation.data.model.metadata.author}</p>
                        </div>
                        <div className="col">
                          <p><strong>Model Use Case: </strong>{evaluation.data.model.model_type}</p>
                        </div>
                      </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
                      







                  </TabPanel>
                )}
            </SwipeableViews>
              
          </div>

    </div>
  );
}
