import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import loginController from '../login-components/login-controller';
import MenuOptions from './MenuOptions';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
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
                  <MenuOptions onMenuAction={this.onMenuAction} />
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    {title}
                  </Typography>
                  <Button onClick={this.state.action} color="inherit">{this.state.label}</Button>
                </Toolbar>
              </AppBar>
            </div>
          );
    };

    onMenuAction = (page) => {
        console.log(page)
        this.props.onMenuAction(page)
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
