import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    state = {
        filterStatus: ''
    };

  onFilterChange= (e) => {
    const filterStatus = e.target.value;
    this.setState({filterStatus});
    this.props.onFilterChange(filterStatus);
  };

  render() {
    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-info"
                value=""
                onClick={this.onFilterChange}>
            All
        </button>
        <button type="button"
                value="active"
                onClick={this.onFilterChange}
                className="btn btn-outline-secondary">
            Active
        </button>
        <button type="button"
                value="done"
                onClick={this.onFilterChange}
                className="btn btn-outline-secondary">
            Done
        </button>
      </div>
    );
  }
}
