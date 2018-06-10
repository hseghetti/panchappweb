import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import loginController from '../login-components/login-controller';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            action: this.onLoginClick,
            label: 'login'
        };
    }

    componentDidMount() {
        this.updateLoginStatus();
    }
    
    render() {
        const { classes, title } = this.props;

        return (
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    {title}
                  </Typography>
                  <Button onClick={this.state.action} color="inherit">{this.state.label}</Button>
                </Toolbar>
              </AppBar>
            </div>
          );
    };

    updateLoginStatus = () => {
        loginController.getLoggedInUserData(((userData) => {
            this.setState({
                action: (userData)? this.onLogoutClick: this.onLoginClick,
                label: (userData)? 'LOGOUT' : 'LOGIN',
                userData:userData
            });
        }));
    };

    onLoginClick = () => {
        loginController.login(this.loginCallBack);
    };

    onLogoutClick = () => {
        loginController.logout(this.logoutCallBack);
    };

    loginCallBack = (data) => {
        this.updateLoginStatus(); 
        this.props.onLoginAction(data);
    };

    logoutCallBack = () => {
        this.updateLoginStatus(); 
        this.props.onLoginAction();
    };

};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onLoginAction: PropTypes.func.isRequired
};

export default withStyles(styles)(ButtonAppBar);
