import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [1, 2, 3, 4, 6, 8, 3, 3, 3, 3]
    }
  }

  render() {
    return (
      <div>
        <nav aria-label="breadcrumb" className="nav-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item" aria-current="page">Dashboard</li>
          </ol>
        </nav>
        <SearchForm/>
        <div>
          {this.state.items?this.state.items.map((item, i) => <Item key={"item-"+i} id={"item-"+i}/>):""}
          <button className="btn btn-outline-primary float-right">Save All</button>
        </div>
        <Pagination/>
      </div>
    );
  }
}

class SearchForm extends Component {
  render () {
    return (
      <div className="row">
        <form className="col-sm-12">
          <div className="input-group">
            <label>Search for an item</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter keywords" aria-label="Enter keywords"/>
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-primary btn-sm float-right">Add Item</button>
          <div className="dropdown float-right dashboard-sort">
            <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort By
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item">By Out of Date</button>
              <button className="dropdown-item">By Needs updated</button>
              <button className="dropdown-item">By Last to spoil</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class Item extends Component {
  render () {
    return (
      <div className="card">
        <a className="card-header" data-toggle="collapse" href={"#"+this.props.id} role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
          Simply Orange Juice
          <i className="text-bold float-right">OOD 1/19/16</i>
        </a>
        <div className="row">
          <div className="col">
            <div className="collapse multi-collapse" id={this.props.id}>
              <div className="card-content">
                <ItemEditForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ItemEditForm extends Component {
  render () {
    return (
      <form>
        <div className="form-group">
          <label>Item Name</label>
          <input type="text" className="form-control" placeholder="Enter Name"/>
        </div>
        <div className="form-group">
          <label>Expire Dates</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-danger">Delete</button>
            </div>
            <input type="date" className="form-control" placeholder="Enter Date"/>
          </div>
        </div>
        <div className="form-group">
          <label>UPC (Optional)</label>
          <input type="text" className="form-control" placeholder="Enter UPC"/>
        </div>
        <button type="submit" className="btn btn-primary float-right save-btn">Save Changes</button>
        <button type="submit" className="btn btn-danger float-left">Delete Item</button>
      </form>
    );
  }
}

class Pagination extends Component {
  render () {
    return (
      <div className="row justify-content-center pagination">
        <nav className="text-center">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}