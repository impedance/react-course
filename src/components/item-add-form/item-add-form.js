import React, { Component } from 'react';
import './item-add-form.css';

class ItemAddForm extends Component {

  render(props) {
    const {onItemAdded} = this.props
    return (
      <div className="item-add-form">
        <button 
          onClick={() =>onItemAdded('hello wordl') }
          className="btn btn-outline-secondary"
          > 
          Add Item
          </button>
      </div>
    )
  }
  
}

export default ItemAddForm;