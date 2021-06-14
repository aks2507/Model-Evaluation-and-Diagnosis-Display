import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Components


function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
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
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: "100%",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		width: 280,
		height: "100%",
	},
	leftarea: {
		backgroundColor: theme.palette.background.paper,
		display: 'inline',
		variant: 'fullWidth',
		height: "100%",
		width: "100%",
	},
}));



export default function Comparison(props) {
	const eval_ids_str = props.match.params.eval_ids;
	// console.log(eval_ids_str);
	let eval_ids = eval_ids_str.split(",");
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const initialValue = [];
	for(let i=0;i<eval_ids.length;i++)
	{
		initialValue.push({data:{}});
	}
	console.log(initialValue);

	const [evalList, setevalList] = React.useState(initialValue);
	const [load, setLoad] = React.useState(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// Fetching the data
	let urls = [];
	let i;
	for(i=0;i<eval_ids.length;i++)
	{
		urls.push("/evaluate/"+eval_ids[i])
	}

	const mapLoop = async _ => {
		console.log('Start')
	  
		const promises = urls.map(async url => {
		  const evaluation = await axios.get(url)
		  return evaluation
		})
	  
		const evaluations = await Promise.all(promises)
		// console.log(evaluations)
	  
		console.log('End')
		return evaluations;
	}
	if(load)
	{
		const evals = mapLoop().then((data) => {
				setevalList(data);
		});
		// console.log(evals,typeof(evals));
		setLoad(false);
	}
	
	// console.log(evalList[0].data.name, evalList[1].data.eval_id);
	evalList.map((evaluation) => {
		console.log(evaluation,typeof(evaluation));
		return null;
	})
	return (
		<>
			{evalList.map((evaluation) => 
				<li key={evaluation.data.eval_id}>{evaluation.data.name}</li>
			)}
		</>
	);
}
