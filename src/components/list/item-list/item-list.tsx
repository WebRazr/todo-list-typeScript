import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { typeArrayData } from "./../../../redux/rootReducer";
import "./item-list.scss";

type typeItemList = {
  dataList: typeArrayData;
};

const ItemList: React.FC<typeItemList> = ({ dataList }) => {
  const { date, important, text, time, done, id } = dataList;
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(text);
  const [styleTask, setStyleTask] = useState<string>("task");

  const dispatch = useDispatch();
  const removeTask = () => {
    const conf = window.confirm(`Вы действительно хотите удалить?`);
    if (conf) {
      return dispatch({ type: "REMOVE_TASK", id: id });
    }
  };
  const doneTask = () => dispatch({ type: "DONE_TASK", id: id });
  const saveTask = () => {
    dispatch({ type: "EDIT_TASK", editT: editText, id: id });
    setEdit(false);
  };
  const inputNewTask = (e: React.FormEvent<HTMLInputElement>): void => {
    setEditText(e.currentTarget.value);
  };
  const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      saveTask();
    }
  };
  const importantTask = () => dispatch({ type: "IMPORTANT_TASK", id: id });

  useEffect(() => {
    if (important === false) {
      setStyleTask("task");
    } else {
      setStyleTask("task addStyleColor");
    }
  }, [important]);
  useEffect(() => {
    if (done === false) {
      setStyleTask("task");
    } else {
      setStyleTask(`${styleTask} op`);
    }
  }, [done]);
  return (
    <div className={styleTask}>
      <div className={"firstBlock"}>
        <div className={"checkBlock"}>
          <div className=" custom-control custom-switch styleDone">
            <input
              type="checkbox"
              className="custom-control-input"
              id={`customSwitch${id}`}
              checked={done}
              onChange={doneTask}
            />

            <label
              className="custom-control-label"
              htmlFor={`customSwitch${id}`}
            >
              {done ? <p>Выполнено</p> : <p>В ожидании</p>}
            </label>
          </div>

          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id={`important${id}`}
              checked={important}
              onChange={importantTask}
            />

            <label className="custom-control-label" htmlFor={`important${id}`}>
              {important ? <p>важно</p> : <p>не важно</p>}
            </label>
          </div>
        </div>

        <div className={"textDateBlock"}>
          <div className={"textBlock"}>
            {edit ? (
              <input
                style={{ width: "90%", marginTop: "-20px" }}
                className=" form-control"
                type="text"
                value={editText}
                onKeyDown={_handleKeyDown}
                onChange={inputNewTask}
              />
            ) : (
              <p>{text}</p>
            )}
          </div>
          <div className={"DateBlock"}>
            <p>{time}</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
      <div className={"btn-style"}>
        {edit ? (
          <button
            type="button"
            className="size-btn-t btn btn-primary"
            onClick={saveTask}
          >
            <div className="divSave"></div>
          </button>
        ) : (
          <button
            type="button"
            className="size-btn-t btn btn-success"
            onClick={() => setEdit(true)}
          >
            <div className="divEdit"></div>
          </button>
        )}
        <button
          type="button"
          className="size-btn-t btn btn-danger"
          onClick={removeTask}
        >
          <div className="divDelete"></div>
        </button>
      </div>
    </div>
  );
};

export default ItemList;
