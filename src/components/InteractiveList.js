import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: true,
  };

  render() {
    const { classes } = this.props;
    const { dense } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
              Who has to pay now?
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {this.renderListItems()}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderListItem = (itemData) => {
    return (
      <ListItem key={itemData._key}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={itemData.panchado}
          secondary={itemData.reason }
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  renderListItems = () => {
    const listOfItems = [];
    
    _.map(this.props.panchos, (item) => {
      listOfItems.push(this.renderListItem(item));
    });

    return listOfItems;
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
  panchos: PropTypes.array.isRequired
};

export default withStyles(styles)(InteractiveList);
