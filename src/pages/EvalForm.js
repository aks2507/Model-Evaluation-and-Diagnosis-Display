import React,{ useState} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
import {
    Link as RedirectLink,
} from 'react-router-dom';

function Cancel() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Button variant="contained" color="inherit" size="large">
        <RedirectLink color="inherit" to="/">
          Cancel
        </RedirectLink>
      </Button>
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function EvalForm() {
  const classes = useStyles();

  const [modelType, setModelType] = React.useState('regression');
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
        name: 'test_eval',
        model_type: 'regression',
        model_path: 'C://',
        dataset_path: 'C://',
        metadata: {},
    });

  const [loading, setLoading] = useState(false);

  const handleDropdownChange = (event) => {
    setModelType(event.target.value);
    setValues({ ...values, ['model_type']: event.target.value });

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, model_type, model_path, dataset_path, metadata } = values;
        const payload = { name, model_type, model_path, dataset_path, metadata };

        await axios.post('/evaluate', payload);
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Evaluation
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Evaluation Name"
            name="name"
            autoComplete="Evaluation Name"
            autoFocus
            onChange={handleChange('name')}
          />

            <div className={classes.formControl}>
              <InputLabel id="model_type">Model Type</InputLabel>
              <Select
                labelId="model_type"
                id="mtype"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={modelType}
                onChange={handleDropdownChange}
              >
                <MenuItem value="regression">Regression</MenuItem>
                <MenuItem value="classification">Classification</MenuItem>
                <MenuItem value="clustering">Clustering</MenuItem>
              </Select>
            </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="model_path"
            label="Model Path"
            id="model_path"
            autoComplete="Model Path"
            onChange={handleChange('model_path')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="dataset_path"
            label="Dataset Path"
            id="dataset_path"
            autoComplete="Dataset Path"
            onChange={handleChange('dataset_path')}
          />

          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="Evaluation Description"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="normal"
            className={classes.submit}
          >
            <RedirectLink color="inherit" to="/">
              Add
            </RedirectLink>
          </Button>

        </form>
      </div>
      <Box mt={8}>
        <Cancel />
      </Box>
    </Container>
  );
};
