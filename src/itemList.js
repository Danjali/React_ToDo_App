import React from 'react';

export default class ItemList extends React.Component {

  deleteItem(index) {
    this.props.deleteItem(index);
  }

  markCompletedItem(index) {
    this.props.markCompletedItem(index);
  }

  editItem(index) {
    this.props.editItem(index);
  }

  render() {
    let items  = this.props.listItems;
    return (
      <ul className="displayList">
        {
          items.map((item, index) => {
            return (
              <li key={index} className="list">
                <span className="listText" title={item.text}>{item.text}</span>
                <span className="taskState">{item.taskState}</span>
                <div className="buttons">
                  <button className="actionButton" onClick={this.editItem.bind(this, index)}>
                    Edit</button>
                  <button className="actionButton" onClick={this.markCompletedItem.bind(this, index)}>
                    Mark as Complete</button>
                  <button className="actionButton" onClick={this.deleteItem.bind(this, index)}>Delete</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
