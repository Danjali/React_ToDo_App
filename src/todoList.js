import React from 'react';
import ItemList from './itemList';
import ItemSearch from './itemSearch';

export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      value: '',
      searchedItems:[],
      taskState: 'To Do',
      buttonType: 'Add'
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.markDoneItem = this.markDoneItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }
  addItem() {
    let {value} = this.state;
    if (this.state.buttonType === 'Update') {
      let copyItems =  [...this.state.items];
      copyItems[this.editItemId].text = value;
      this.setState({
        items: copyItems,
        buttonType: 'Add',
        value: ''
      });
    } else if(value) {
      this.setState({
        items: [...this.state.items, {text: value, taskState: this.state.taskState}],
        searchedItems: [...this.state.items, {text: value, taskState: this.state.taskState}],
        value: ''
      });
    }
  }

  removeItem(id) {
    const updatedListAfterRemove = [...this.state.items].filter((items,key) => key !== id);
    this.setState({
      searchedItems: updatedListAfterRemove
    });
  }

  markDoneItem(id) {
    let newState = Object.assign({}, this.state);
    newState.items[id].taskState = 'Done';
    this.setState({newState});
    this.sortList(this.state.items);
  }

  sortList(list){
    list = list.sort((a, b) => {
      return b.taskState.localeCompare(a.taskState);
    });
    this.setState({
      searchedItems: list
    });
  }

  editItem(id) {
    this.editItemId = id;
    this.setState({
      value: this.state.items[id].text,
      searchedItems: this.state.items,
      buttonType: 'Update'
    });
  }

  searchItem(searchValue) {
    const result = [...this.state.items].filter(item => item.text.search(searchValue.toLowerCase()) > -1);
    this.setState({
      searchedItems: result
    });
  }

  render() {
    let { items,searchedItems,buttonType} = this.state;
    return (
      <div className="list">
        <span className="AppHeader">ToDo App</span>
        <div>
          <input className="input" size="40" type="text" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} placeholder="Enter Task"/>
          <button onClick={this.addItem} type="button" className="btn btn-primary" disabled={!this.state.value}>{buttonType}</button>
          {items.length > 0 &&
            <ItemSearch searchItem={this.searchItem}/>
          }
        </div>
        <div>
          <ItemList listItems={searchedItems} removeItem={this.removeItem} markDoneItem={this.markDoneItem} editItem={this.editItem}/>
        </div>
      </div>
    );
  }
}
