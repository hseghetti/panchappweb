import './PanchoListPage.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InteractiveList from './InteractiveList';
import logo from '../icon.png';

class PanchoListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panchos: props.panchos
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            panchos: props.panchos
        })
    }

    render() {
        return (
            <div className="PanchoListPage">
                <div className="PanchoListPage-logo-container">
                    <img src={logo} className="PanchoListPage-logo" alt="logo" />
                </div>
                <div className="PanchoListPage-list-container">
                    <InteractiveList panchos={this.state.panchos} />
                </div>
            </div>
        );
    }    
};

PanchoListPage.propTypes = {
    panchos: PropTypes.arrayOf({
        date: PropTypes.string,
        panchado: PropTypes.string,
        reason: PropTypes.string,
        _key: PropTypes.string
    })
};

export default PanchoListPage;