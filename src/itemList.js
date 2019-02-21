import React from 'react';

export default class ItemList extends React.Component {

  removeItem(index) {
    this.props.removeItem(index);
  }

  markDoneItem(index) {
    this.props.markDoneItem(index);
  }

  editItem(index) {
    this.props.editItem(index);
  }

  render() {
    let { listItems }  = this.props;
    return (
      <div className="TableBox">
        { listItems.length > 0 &&
          <div className="Table">
            <div className="CellHeadings">Description</div>
            <div className="CellHeadings">Status</div>
            <div className="CellHeadings">Actions</div>
            {
              listItems.map((item, index) => {
                return (
                  <div key={index} className="Row">
                    <div className="Cell" title={item.text}>{item.text}</div>
                    <div className="Cell">{item.taskState}</div>
                    <div className="Cell">
                      <button  type="button" className="btn btn-secondary" onClick={this.editItem.bind(this, index)}>
                    Edit</button>
                      <button  type="button" className="btn btn-secondary" disabled={item.taskState === 'Done'} onClick={this.markDoneItem.bind(this, index)}>
                    Done</button>
                      <button  type="button" className="btn btn-secondary" onClick={this.removeItem.bind(this, index)}>Remove</button>
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
