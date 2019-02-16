import React from 'react';
import ItemList from './itemList';
import ItemSearch from './itemSearch';

export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      searchedItems:[]
    };
    this.taskState = "To Do";
    this.buttonType = "Add";
    this.msg = "";
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.markCompletedItem = this.markCompletedItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  addItem() {
    let inputText = this.refs.taskInput.value;
    if(this.buttonType === "Update") {
      this.state.items[this.editItemId].text = inputText;
      this.buttonType = "Add";
      this.refs.taskInput.value = '';
    }
    else if (inputText) {
      this.state.items = [...this.state.items, {text: inputText, taskState: this.taskState}];
      this.refs.taskInput.value = '';
    }
    else {
      this.msg = "Empty task cannot be added";
    }
    this.setState({
        items: this.state.items
    });
  }

  deleteItem(id) {
    this.setState({
         items: this.state.items.filter((items,key) => key !== id)
    })
  }

  markCompletedItem(id) {
    this.state.items[id].taskState = "Completed";
    this.setState({
        items: this.state.items
    })
  }

  editItem(id) {
    this.refs.taskInput.value = this.state.items[id].text;
    this.buttonType = "Update";
    this.editItemId = id;
    this.setState({
        items: this.state.items
    })
  }

  searchItem(searchedText) {
    const result = this.state.items.filter(item => {
         return item.text.toLowerCase().includes(searchedText.toLowerCase());
    });
    this.setState({
      searchedItems: result
    })
  }

  render() {
    let { items } = this.state;
    return (
      <div className="list">
        <h1>ToDo List</h1>
        <div>
          <input className="input" ref="taskInput" type="text" placeholder="Enter Task"/>
          <button onClick={this.addItem}>{this.buttonType}</button>
        </div>
        <div>
          <ItemList listItems={items} deleteItem={this.deleteItem} markCompletedItem={this.markCompletedItem} editItem={this.editItem}/>
        </div>
        {items &&
        <div>
          <ItemSearch searchedListItems={this.state.searchedItems} searchItem={this.searchItem}/>
        </div>
        }
      </div>
    );
  }
}
