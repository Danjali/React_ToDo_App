import React from 'react';
import ItemList from './itemList';
import ItemSearch from './itemSearch';

export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      searchedItems:[],
      taskState: 'To Do',
      buttonType: 'Add'
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.markCompletedItem = this.markCompletedItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  addItem() {
    let inputText = this.refs.taskInput.value;
    if (this.state.buttonType === 'Update') {
      this.state.items[this.editItemId].text = inputText;
    } else if(inputText) {
      this.state.items = [...this.state.items, {text: inputText, taskState: this.state.taskState}];
    }

    this.refs.taskInput.value = '';
    this.setState({
      searchedItems: this.state.items,
      buttonType: 'Add'
    });
  }

  deleteItem(id) {
    this.setState({
      searchedItems: [...this.state.searchedItems].filter((items,key) => key !== id)
    });
  }

  markCompletedItem(id) {
    this.state.items[id].taskState = 'Completed';
    this.setState({
      searchedItems: this.state.items
    });
  }

  editItem(id) {
    this.refs.taskInput.value = this.state.items[id].text;
    this.editItemId = id;
    this.setState({
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
        <h1>ToDo List</h1>
        <div>
          <input className="input" ref="taskInput" size="40" type="text" placeholder="Enter Task"/>
          <button onClick={this.addItem}>{buttonType}</button>
          {items.length>0 &&
            <ItemSearch searchItem={this.searchItem}/>
          }
        </div>
        <div>
          <ItemList listItems={searchedItems} deleteItem={this.deleteItem} markCompletedItem={this.markCompletedItem} editItem={this.editItem}/>
        </div>
      </div>
    );
  }
}
