import React from 'react';
import ReactDom from 'react-dom';

export default class TodoList extends React.Component {
  constructor(){
    super();
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
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

  render() {
    let { items } = this.state;
    return (
      <div className="list">
        <h1>ToDo List</h1>
        <input className="input" ref="taskInput"  type="text" placeholder="enter task"/>
        <button className="btn" onClick={this.addItem}>Add</button>
        <ul className="displayList">
          {
            items.map((item, index) => {
              return <li key={index}> {item.text} </li>
            })
          }
        </ul>
      </div>
    )
  }
}
