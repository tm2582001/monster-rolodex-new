import { useState, useEffect } from "react";
import CardList from "./component/card-list/card-list.component";
import SearchBox from "./component/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters,setFilteredMonsters] = useState(monsters);

  console.log("render");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setMonsters(users))
      .catch((e) => console.log(e));
  }, []);

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  },[monsters,searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        className="monsters-search-box"
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((users) => this.setState({ monsters: users }))
//       .catch((e) => console.log(e));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState(()=>{
//       return {searchField};
//     })
//   }

//   render() {
//     const {monsters, searchField} = this.state;
//     const {searchChange} = this;
//     const filteredMonster = monsters.filter((monster)=>{
//       return monster.name.toLowerCase().includes(searchField);
//     })
//     return (
// <div className="App">
// <h1 className="app-title">Monster Rolodex</h1>
// <SearchBox
// onChangeHandler={onSearchChange}
// className="monsters-search-box"
// placeholder="search monsters"
// />

//    <CardList monsters={filteredMonster} />
// </div>
//     );
//   }
// }

export default App;
