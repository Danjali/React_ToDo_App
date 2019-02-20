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
      <div>
        { items.length > 0 &&
          <div className="Table">
            <div className="CellHeadings">Description</div>
            <div className="CellHeadings">Status</div>
            <div className="CellHeadings">Actions</div>
            {
              items.map((item, index) => {
                return (
                  <div key={index} className="Row">
                    <div className="Cell" title={item.text}>{item.text}</div>
                    <div className="Cell">{item.taskState}</div>
                    <div className="Cell">
                      <button className="actionButton" onClick={this.editItem.bind(this, index)}>
                    Edit</button>
                      <button className="actionButton" onClick={this.markCompletedItem.bind(this, index)}>
                    Mark as Complete</button>
                      <button className="actionButton" onClick={this.deleteItem.bind(this, index)}>Delete</button>
                    </div>
                  </div>
                );
              })
            }
          </div>
        }
      </div>
    );
  }
}
