import React from 'react';

export default class ItemSearch extends React.Component {
  constructor(props) {
   super();
   this.state = {
       searchState: ''
   };
   this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(){
    if(this.refs.searchInput.value) {
      this.setState({
        searchState: true
      })
    } else {
      this.setState({
        searchState: false
      })
    }
    this.props.searchItem(this.refs.searchInput.value);
  }

  render(){
    let items = this.props.searchedListItems;
    return (
      <div>
        <div>
          <input className="input" ref="searchInput" type="text" placeholder="Search Task" onChange={this.handleInputChange}/>
        </div>
        {this.state.searchState &&
          <ul className="displayList">
            {
              items.map((item, index) => {
                return (
                  <li key={index} className="list">
                    <span>Task:: {item.text}</span>
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
    )
  }
}
