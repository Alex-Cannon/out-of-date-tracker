import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      newItems: []
    }
  }

  set(obj) {
    this.setState(obj);
  }

  search(query, skip) {
    // Create search
    let search = '';
    search += query?"?query="+query:"";
    search += skip?search.length > 0?"&skip="+skip:"?skip="+skip:"";

    axios.get("/api/items" + search)
    .then((res) => {
      // Update URI
      this.props.history.push('/dashboard' + search);
      this.setState({items: res.data});
    })
    .catch(() => {
    });
  }

  componentWillMount() {
    let search = this.props.location.search;

    axios.get('/api/items' + search)
    .then((res) => {
      this.setState({items: res.data});
    })
    .catch((err) => {
      alert("(" + err.response + ")Error Loading items...");
    });
  }

  render() {
    return (
      <div>
        <div className="breadcrumb">
          <i>{this.props.globals.user?this.props.globals.user.username + "'s Dashboard":""}</i>
        </div>
        <SearchForm newItems={this.state.newItems} set={this.set.bind(this)} search={this.search.bind(this)}/>
        <div className="row">
          <div className="col">
            <NewItems set={this.set.bind(this)} items={this.state.newItems}/>
            {this.state.items?this.state.items.map((itemData, i) => <Item data={itemData} key={"item-"+i} id={"item" + i + itemData._id} index={i} items={this.state.items} set={this.set.bind(this)}/>):""}
          </div>
        </div>
        <Pagination search={this.props.location.search} searchBy={this.search.bind(this)} items={this.state.items}/>
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    }
  }

  addItem(e) {
    e.preventDefault();
    let items = this.props.newItems;
    items.push({name: "New Item", dates: [""], class: "border-primary"});
    this.props.set({newItems: items});
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.search(this.state.query, 0);
  }

  render () {
    return (
      <div className="row">
        <form className="col-sm-12" method="POST" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <label>Search for an item</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter Search" value={this.state.query} onChange={this.handleChange.bind(this)}/>
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="submit" id="button-addon2">Search</button>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-primary btn-sm float-right add-item-btn" onClick={this.addItem.bind(this)}>Add Item</button>
        </form>
      </div>
    );
  }
}

class NewItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        className: "",
        msg: ""
      }
    }
  }

  saveAll(e) {
    let items = this.props.items;
    items = items.map((item) => {

      // Convert dates to unix
      for(let i = item.dates.length; i--; i > -1) {
        if (item.dates[i].length && item.dates[i].length > 0) {
          item.dates[i] = new Date(item.dates[i]).getTime();  
        } else {
          item.dates.splice(i, 1);
        }
      }
      
      return item;
    });

    axios.post('/api/items', {items: this.props.items})
    .then((res) => {
      let newAlert = {
        className: "alert alert-success",
        msg: "Items saved!"
      }
      this.setState({alert: newAlert}, this.removeMessage);
    })
    .catch((err) => {
      let newAlert = {
        className: "alert alert-danger",
        msg: err.response.statusText
      }
      this.setState({alert: newAlert}, this.removeMessage);
    });
  }

  removeMessage() {
    window.setTimeout(() => {
      let reset = {
        className: "",
        msg: ""
      };
      this.setState({alert: reset});
    }, 4000);
  }

  render () {
    if (!this.props.items || !this.props.items.length) {
      return "";
    }

    return (
      <div className="row">
        <div className="col">
          <div className={this.state.alert.className + " my-alert"}>{this.state.alert.msg}</div>
          {this.props.items.map((itemData, i) => (
            <Item key={"newitem-" + i} data={itemData} id={"item" + i + itemData._id} index={i} items={this.props.items} set={this.props.set.bind(this)} newItem={true}/>
          ))}
          <button className="btn btn-outline-primary btn-sm float-right save-all-btn" onClick={this.saveAll.bind(this)}>Save All</button>
        </div>
      </div>
    );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);

    let items = this.props.items;
    let item = this.props.data;
    item.open = false;
    items[this.props.index] = item; 
    this.props.set({items});

    this.state = {
      outline: ""
    }
  }

  toggleOpen() {
    let items = this.props.items;
    let item = this.props.data;
    item.open = !item.open;
    items[this.props.index] = item; 
    this.props.set({items});
  }

  getFirstToSpoil() {
    if (!this.props.data.dates) {
      return "Needs Date";
    }

    let dates = this.props.data.dates;
    let greatest = 0;
    for(let i = 0; i < dates.length; i++) {
      if (dates[i] > greatest) {
        greatest = dates[i];
      }
    }

    if (greatest !== 0) {
      return new Date(greatest).toISOString().substring(0, 10);
    } else {
      return "Needs Date";
    }
  }

  setOutline(ood) {
    if (ood !== "Needs Date") {
      let now = new Date();
      ood = new Date(ood);

      if (ood.getTime() <= now.getTime()) {
        this.setState({outline: " border-danger"});
      } else if (ood.getTime() - now.getTime() <= 432000000 ) {
        this.setState({outline: " border-warning"});
      } else {
        this.setState({outline: ""});
      }
    } else {
      this.setState({outline: " border-secondary"});
    }
  }

  componentWillMount() {
    this.setOutline(this.getFirstToSpoil());
  }

  render () {
    const data = this.props.data || {name: "Undefined"};
    return (
      <div className={data.class?"card " + data.class + this.state.outline:"card" + this.state.outline}>
        <a className="card-header" href={"#"+this.props.id} role="button" onClick={this.toggleOpen.bind(this)}>
          {data.name || "No Name"}
          <i className="text-bold float-right">OOD {this.getFirstToSpoil()}
          </i>
        </a>
        <div className="row">
          <div className="col">
            <div className={this.props.data.open?"card-content item":"card-content item close-item"}>
              <ItemEditForm data={this.props.data} index={this.props.index} items={this.props.items} set={this.props.set.bind(this)} newItem={this.props.newItem}/>
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
      alert: {
        className: "",
        msg: ""
      }
    }
  }

  addDate(e) {
    e.preventDefault();
    let dates = this.props.data.dates;
    dates.push("");
    this.setItem('dates', dates);
  }

  setItem(key, value) {
    let items = this.props.items;
    items[this.props.index][key] = value;
    if (this.props.newItem) {
      this.props.set({newItems: items});
    } else {
      this.props.set({items});
    }
  }

  removeDate(e, index) {
    e.preventDefault();
    let dates = this.props.data.dates;
    dates.splice(index, 1);
    this.setItem('dates', dates);
  }

  submitItem(e) {
    e.preventDefault();
    let item = this.props.data;

    // Convert dates to unix
    for(let i = item.dates.length; i--; i > -1) {
      if (item.dates[i].length && item.dates[i].length > 0) {
        item.dates[i] = new Date(item.dates[i]).getTime();  
      } else {
        item.dates.splice(i, 1);
      }
    }
    
    // POST item
    axios.put('/api/item', item)
    .then((res) => {
      let newAlert = {
        className: "alert alert-success",
        msg: "Item saved"
      };
      this.setState({alert: newAlert}, this.removeMessage);
      this.setItem('_id', res.data._id);
    })
    .catch((err) => {
      let newAlert = {
        className: "alert alert-danger",
        msg: err.response.statusText
      };
      this.setState({alert: newAlert});
    });
  }

  deleteItem(e) {
    e.preventDefault();
    if (!this.props.data._id) {
      let items = this.props.items;
      items.splice(this.props.index, 1);
      if (this.props.newItem) {
        this.props.set({newItems: items});
      } else {
        this.props.set({items});
      }
      return;
    }

    axios.delete('/api/item', {data: {item_id: this.props.data._id}})
    .then(() => {
      let items = this.props.items;
      items.splice(this.props.index, 1);
      this.props.set({items});
    })
    .catch((err) => {
      let newAlert = {
        className: "alert alert-danger",
        msg: err.response.statusText
      };
      this.setState({alert: newAlert}, this.removeMessage);
    })
  }

  removeMessage() {
    window.setTimeout(() => {
      let reset = {
        className: "",
        msg: ""
      };
      this.setState({alert: reset});
    }, 4000);
  }

  handleNameChange(e) {
    e.preventDefault();
    this.setItem('name', e.target.value);
  }

  handleDateChange(e, i) {
    e.preventDefault();
    let dates = this.props.data.dates;
    dates[i] = e.target.value;
    this.setItem('dates', dates);
  }

  render () {
    return (
      <>
        <div className={this.state.alert.className + " my-alert"}>{this.state.alert.msg}</div>
        <form method="POST" onSubmit={this.submitItem.bind(this)}>
          <div className="form-group">
            <label>Item Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" value={this.props.data.name !== "New Item"?this.props.data.name:""} onChange={this.handleNameChange.bind(this)}/>
          </div>
          <div className="form-group expire-dates-list">
            <label>Expire Dates</label>
            {this.props.data.dates?this.props.data.dates.map((unix, i) => {
              return (
                <div className="input-group mb-3" key={"date-" + i}>
                  <div className="input-group-prepend">
                    <button className="btn btn-danger" onClick={(e) => this.removeDate(e, i)}>Delete</button>
                  </div>
                  <input type="date" className="form-control" placeholder="Enter Date" value={unix !== ""? new Date(unix).toISOString().substring(0, 10):""} onChange={(e) => this.handleDateChange(e, i)}/>
                </div>
              );
            }):""}
            <button className="btn btn-outline-primary btn-sm float-right" onClick={this.addDate.bind(this)}>Add Date</button>
          </div>
          <button type="submit" className="btn btn-success float-right save-btn">Save Changes</button>
          <button onClick={this.deleteItem.bind(this)} className="btn btn-danger float-left">Delete Item</button>
        </form>
      </>
    );
  }
}

class Pagination extends Component {

  getQuery() {
    let url = "/dashboard";
    let search = this.props.search;
    let query;
    if (search.indexOf('query') !== -1) {
      return search.substring(search.indexOf("=") + 1, search.indexOf("&") !== -1? search.indexOf("&"): search.length);
    } else {
      return null;
    }
  }

  getSkip() {
    let search = this.props.search;
    if (search.indexOf("skip") !== -1) {
      let skip = search.substring(search.indexOf("skip=") + 5, search.length);
      return parseInt(skip);
    } else {
      return 0;
    }
  }

  render () {
    return (
      <div className="row justify-content-center pagination">
        <nav className="text-center">
          <ul className="pagination">
            {this.getSkip() > 0?(
              <li className="page-item"><span className="page-link" onClick={() =>this.props.searchBy(this.getQuery(), this.getSkip() - 1)}>Previous</span></li>
            ):""}
            {this.props.items.length === 10?(
              <li className="page-item"><span className="page-link" onClick={() => this.props.searchBy(this.getQuery(), this.getSkip() + 1)}>Next</span></li>
            ):""}
          </ul>
        </nav>
      </div>
    );
  }
}

