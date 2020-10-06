import React from "react";
import "./App.css";
import BtnFilter from "./btn-sort/btn-sort";
import TodoList from "./list/todo-list";
import SearchPanel from "./search-panel/search-panel";
import InputPanel from "./top-bar/input-panel";
import "./list/item-list/item-list.scss";

function App() {
  return (
    <div className="App">
      <InputPanel />
      <div className={"flexSF"}>
        <SearchPanel />
        <BtnFilter />
      </div>
      <TodoList />
    </div>
  );
}

export default App;
