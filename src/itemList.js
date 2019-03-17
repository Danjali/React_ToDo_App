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
      <div className="tableBox">
        { listItems.length > 0 &&
          <div className="table">
            <div className="cellHeadings">Description</div>
            <div className="cellHeadings">Status</div>
            <div className="cellHeadings">Actions</div>
            {
              listItems.map((item, index) => {
                return (
                  <div key={index} className="Row">
                    <div className="cell" title={item.text}>{item.text}</div>
                    <div className="cell">{item.taskState}</div>
                    <div className="cell">
                      <button  type="button" className="btn btn-secondary" disabled={item.taskState === 'Done'} onClick={this.editItem.bind(this, index)}>
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
