import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  set(obj) {
    this.setState(obj);
  }

  componentDidMount() {
    axios.get('/items?sortby=date&page=0')
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <div className="breadcrumb">
          <i>{this.props.globals.user?this.props.globals.user.username + "'s Dashboard":""}</i>
        </div>
        <SearchForm items={this.state.items} set={this.set.bind(this)}/>
        <div className="row">
          <div className="col">
            {this.state.items?this.state.items.map((itemData, i) => <Item data={itemData} key={"item-"+i} id={"item-"+i}/>):""}
            <button className="btn btn-outline-primary btn-sm float-right save-all-btn">Save All</button>
          </div>
        </div>
        <Pagination/>
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor(props) {
    super(props);
  }

  addItem(e) {
    e.preventDefault();
    let items = this.props.items;
    items.push({name: "New Item", class: "border-primary"});
    this.props.set({items: items});
  }

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
          <button className="btn btn-outline-primary btn-sm float-right" onClick={this.addItem.bind(this)}>Add Item</button>
          <div className="dropdown float-right dashboard-sort">
            <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort By
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item">Out of Date</button>
              <button className="dropdown-item">Needs Dates</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class Item extends Component {
  render () {
    const data = this.props.data || {name: "Undefined"};
    return (
      <div className={data.class?"card " + data.class:"card"}>
        <a className="card-header" data-toggle="collapse" href={"#"+this.props.id} role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
          {data.name}
          <i className="text-bold float-right">OOD 1/19/16</i>
        </a>
        <div className="row">
          <div className="col">
            <div className="collapse multi-collapse" id={this.props.id}>
              <div className="card-content">
                <ItemEditForm data={this.props.data}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ItemEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.data.name === "New Item"?"":this.props.data.name,
      dates: this.props.data.dates || [""]
    }
  }

  handleNameChange() {

  }

  handleDateChange(e, i) {
    e.preventDefault();
    let dates = this.state.dates;
    dates[i] = e.target.value;
    this.setState({dates});
  }

  addDate(e) {
    e.preventDefault();
    let dates = this.state.dates;
    dates.push("");
    this.setState({dates});
  }

  removeDate(e, index) {
    e.preventDefault();
    let dates = this.state.dates;
    console.log("BEFORE: " + JSON.stringify(dates));
    dates.splice(index, 1);
    console.log("AFTER: " + JSON.stringify(dates));
    this.setState({dates});
  }

  render () {
    return (
      <form>
        <div className="form-group">
          <label>Item Name</label>
          <input type="text" className="form-control" placeholder="Enter Name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
        </div>
        <div className="form-group expire-dates-list">
          <label>Expire Dates</label>
          {this.state.dates?this.state.dates.map((date, i) => {
            return (
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <button className="btn btn-danger" onClick={(e) => this.removeDate(e, i)}>Delete</button>
                </div>
                <input type="date" className="form-control" placeholder="Enter Date" value={date} onChange={(e) => this.handleDateChange(e, i)}/>
              </div>
            );
          }):""}
          <button className="btn btn-outline-primary btn-sm float-right" onClick={this.addDate.bind(this)}>Add Date</button>
        </div>
        <button type="submit" className="btn btn-success float-right save-btn">Save Changes</button>
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