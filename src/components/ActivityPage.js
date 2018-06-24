import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
});

function ActivityPage (props) {
  const { activity, classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Pancho Information</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Blame</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activity.map(a => {
            return (
              <TableRow key={a._key}>
                <TableCell>{a.panchoInfo}</TableCell>
                <TableCell>{a.action}</TableCell>
                <TableCell>{a.blame}</TableCell>
                <TableCell>{a.date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ActivityPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityPage);
