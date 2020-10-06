import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeState } from "./../../redux/rootReducer";

type BtnType = {
  name: string;
  label: string;
};

const BtnFilter: React.FC = () => {
  const [done, setDone] = useState<number>(0);
  const [nDone, setNDone] = useState<number>(0);
  const dispatch = useDispatch();
  const onFilterChange = (name: string) => {
    dispatch({ type: "FILTER_LIST", filter: name });
  };
  const value = useSelector((state: typeState) => state.filter);
  const todoData = useSelector((state: typeState) => state.todoData);
  useEffect(() => {
    if (todoData === null) {
      setNDone(0);
    } else {
      let doneTasks = todoData.filter((el) => el.done !== true);
      setNDone(doneTasks.length);
    }
    if (todoData === null) {
      setDone(0);
    } else {
      let doneTasks = todoData.filter((el) => el.done === true);
      setDone(doneTasks.length);
    }
  }, [todoData]);
  const buttons: BtnType[] = [
    { name: "all", label: "Все" },
    { name: "active", label: `Активные ${nDone}` },
    { name: "done", label: `Готовые ${done}` },
  ];
  const btnSort = buttons.map(({ label, name }) => {
    let styleB = name === value;
    return (
      <button
        style={{ margin: "0 5px" }}
        type="button"
        className={styleB ? "btn btn-dark" : "btn btn-light"}
        onClick={() => onFilterChange(name)}
        key={name}
      >
        {label}
      </button>
    );
  });

  return <div>{btnSort}</div>;
};

export default BtnFilter;
