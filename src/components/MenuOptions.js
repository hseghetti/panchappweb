import './MenuOptions.css';
import React, {Component} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { EEXIST } from 'constants';

class MenuOptions extends Component {

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (menuSelected) => {
        this.setState({
                anchorEl: null,
                menuSelected: menuSelected
            }, this.onMenuAction
        );
    };

    render() {
        return (
            <div className="MenuOptions">
                <IconButton className='MenuOptions-menuButton' color="inherit" aria-label="Menu" onClick={this.handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu {...this.getMenuProps()}>
                    <MenuItem onClick={this.handleClose.bind(this, 'panchoListPage')}>Pancho List</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this, 'panchoAddPage')}>New Pancho</MenuItem>
                </Menu>
            </div>
        );
    }

    onMenuAction = () => {
        this.props.onMenuAction(this.state.menuSelected);
    };

    getMenuProps = () => {
        const { anchorEl } = this.state;

        return {
            id: 'fade-menu',
            anchorEl: anchorEl,
            open: Boolean(anchorEl),
            onClose: this.handleClose
        };
    }
};

export default MenuOptions;