import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

// const useStyles = makeStyles({
//   table: {
//     width:"90%",
//     margin:"auto",
//   },
//   title: {
//     flex: '1 1 100%',
//   },
// });

export default function ModelInfo(props) {
  // const classes = useStyles();

  let k = props.keys;
  let v = props.values;

  return (
    <>
      <List>
        {k.map((key) =>
          <ListItemText primary={`${key} : ${v[k.indexOf(key)]}`} />
        )}
      </List>
    </>
  );
}
