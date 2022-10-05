import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {


    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdded(this.state.label);
        this.setState({
            label: ''
        });
    };


    render() {

        return (
            <form className='item-add-form'
                  onSubmit={this.onSubmit}>
                <input 
                    name='add-form'
                    className="form-control" 
                    type="text" 
                    placeholder='What needs to be done' 
                    onChange={this.onLabelChange}
                    value={this.state.label}>         
                </input>
                <button type="submit" 
                className='btn btn-outline-success item-add-form-btn'>
                    ADD
                </button>
            </form>
        )    
    };
};

