import React from "react";
import { connect } from "react-redux";
import { typeState, typeArrayData } from "./../../redux/rootReducer";
import ItemList from "./item-list/item-list";
type typeList = {
  dataReducer: typeState;
};

const TodoList: React.FC<typeList> = ({ dataReducer }) => {
  let datarr: any = "";
  if (dataReducer.todoData === null) {
    datarr = "";
  } else {
    const filter = (
      items: typeArrayData[],
      filter: string
    ): typeArrayData[] => {
      switch (filter) {
        case "all":
          return items;
        case "active":
          return items.filter((el) => el.done === false);
        case "done":
          return items.filter((el) => el.done === true);
        default:
          return items;
      }
    };
    const filterSearch = (arrayTodo: typeArrayData[]) => {
      if (dataReducer.search === "") {
        return arrayTodo;
      } else {
        return arrayTodo.filter((item) => {
          return (
            item.text.toLowerCase().indexOf(dataReducer.search.toLowerCase()) >
            -1
          );
        });
      }
    };

    datarr = filterSearch(filter(dataReducer.todoData, dataReducer.filter)).map(
      (el) => {
        return <ItemList key={el.id} dataList={el} />;
      }
    );
  }
  if (datarr.length === 0) {
    return <div style={{ marginTop: "20px" }}>записей не найдено</div>;
  }
  return <div>{datarr}</div>;
};
function mapStateToProps(state: typeState): { dataReducer: typeState } {
  return { dataReducer: state };
}
function mapDispatchToProps(dispatch: any) {
  return {
    addTask: (newTaskR: typeArrayData) =>
      dispatch({ type: "ADD_TASK", newTaskR: newTaskR }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
