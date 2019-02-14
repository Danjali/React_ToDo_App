import React from 'react';
import ItemList from './itemList';

export default class TodoList extends React.Component {
  constructor(){
    super();
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem() {
    let inputText = this.refs.taskInput.value;
    if (inputText) {
      this.setState({
        items: [...this.state.items, {text: inputText}]
      });
      this.refs.taskInput.value = '';
    }
  }

  deleteItem(id) {
    this.setState({
         items: this.state.items.filter((items,key) => key !== id)
    })
  }

  render() {
    let { items } = this.state;
    return (
      <div className="list">
        <h1>ToDo List</h1>
        <div>
          <input className="input" ref="taskInput"  type="text" placeholder="enter task"/>
          <button onClick={this.addItem}>Add</button>
        </div>
        <div>
          <ItemList listItems={items} deleteItem={this.deleteItem}/>
        </div>
      </div>
    );
  }
}
