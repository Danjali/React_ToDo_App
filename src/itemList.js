import React from 'react';

export default class ItemList extends React.Component {

  deleteItem(index) {
        this.props.deleteItem(index);
  }

  render() {
    let items  = this.props.listItems;
    return (
      <ul className="displayList">
        {
          items.map((item, index) => {
            return (
              <li key={index} className="list">
                <span className="listText">Task:: {item.text}</span>
                <button className="actionButton" onClick={this.deleteItem.bind(this, index)}>Delete</button>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
