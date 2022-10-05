import React, { Component } from 'react';

import './todo-list-item.css';


export default class TodoListItem extends Component {


  
  render() {
    const { label, onDelited, onToggleDone, onToggleImportant, done, important } = this.props;

    let classNames = "todo-list-item";

    if (done) {
      classNames += ' done';
    }

    if(important) {
      classNames += ' important'
    }

  
    return (
      <div>
        <span className= { classNames }>
        <span
          className="todo-list-item-label"
          onClick = { onToggleDone }>
          {label}
        </span>
  
        <div>
          <button type="button"
                  className="btn btn-outline-success btn-sm float-right"
                  onClick={ onToggleImportant }>
                  <i className="bi bi-exclamation-lg" />
          </button>
  
          <button type="button"
                  className="btn btn-outline-danger btn-sm float-right"
                  onClick={ onDelited }>
                  <i className="bi bi-trash-fill" />
          </button>
        </div>
      </span>
      </div>
    );
  }
}


