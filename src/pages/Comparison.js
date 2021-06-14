import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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

	// console.log(data[1].data);
	return (
		<>
			Hello_World!!
		</>
	);
}
