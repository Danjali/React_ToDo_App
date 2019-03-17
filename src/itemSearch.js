export default class ItemSearch extends React.Component {
  constructor(props) {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.props.searchItem(this.refs.searchInput.value);
  }

  render() {
    return (
      <div className="SearchWrapper">
        <input className="input"
          ref="searchInput"
          type="text"
          placeholder="Search Task"
          size="30"
          onChange={this.handleInputChange} />
      </div>
    );
  }
}
