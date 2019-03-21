import ItemList from './itemList';
import ItemSearch from './itemSearch';
import ToDoList from './static/toDoList.json';

export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: ToDoList.taskList,
      value: '',
      searchedItems: ToDoList.taskList,
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
    let inputText = this.state.value;
    if (this.state.buttonType === 'Update') {
      this.state.items[this.editItemId].text = inputText;
    } else if(inputText) {
      this.state.items = [...this.state.items, {text: inputText, taskState: this.state.taskState}];
    }
    this.state.value = '';
    this.setState({
      searchedItems: this.state.items,
      buttonType: 'Add'
    });
  }

  removeItem(id) {
    this.state.items = [...this.state.items].filter((items,key) => key !== id);
    this.setState({
      searchedItems: this.state.items
    });
  }

  markDoneItem(id) {
    this.state.items[id].taskState = 'Done';
    this.sortList(this.state.items);
  }

  sortList(list) {
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
      value: [...this.state.items][id].text,
      buttonType: 'Update'
    });
  }

  searchItem(searchValue) {
    const result = [...this.state.items].filter(item => item.text.toLowerCase().search(searchValue.toLowerCase()) > -1);
    this.setState({
      searchedItems: result
    });
  }

  render() {
    let { items,searchedItems,buttonType, value } = this.state;
    return (
      <div className="list">
        <span className="appHeader">ToDo App</span>
        <div>
          <input className="input" size="40" type="text" onChange={e => this.setState({ value: e.target.value })} value={value} placeholder="Enter Task"/>
          <button onClick={this.addItem} type="button" className="btn btn-primary" disabled={!value}>{buttonType}</button>
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
