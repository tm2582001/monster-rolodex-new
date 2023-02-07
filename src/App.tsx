import { useState, useEffect, ChangeEvent } from "react";
import CardList from "./component/card-list/card-list.component";
import SearchBox from "./component/search-box/search-box.component";

import { getData } from "./utils/data.utils";
import "./App.css";

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  // const [title, setTitle] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters,setFilteredMonsters] = useState(monsters);

  console.log("render");
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((users) => setMonsters(users))
    //   .catch((e) => console.log(e));

    const fetchUsers = async()=>{
      const users = await getData<Monster[]>("https://jsonplaceholder.typicode.com/users");
      setMonsters(users);
    };

    fetchUsers();
  }, []);

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  },[monsters,searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  // const onTitleChange = (event) => {
  //   const searchFieldString = event.target.value.toLowerCase();
  //   // setTitle(searchFieldString);
  // };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>
      {/* <h1 className="app-title">{title}</h1> */}
      <SearchBox
        onChangeHandler={onSearchChange}
        className="monsters-search-box"
        placeholder="search monsters"
      />
      <br />
      {/* <SearchBox
        onChangeHandler={onTitleChange}
        className="monsters-search-box"
        placeholder="search monsters"
      /> */}
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
