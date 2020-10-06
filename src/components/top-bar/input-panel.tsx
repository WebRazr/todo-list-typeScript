import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { typeState, typeArrayData } from "../../redux/rootReducer";
type typePropsSearchPanel = {
  dataReducer: typeState;
  addTask: (newTaskR: typeArrayData) => any;
};
const InputPanel: React.FC<typePropsSearchPanel> = ({
  dataReducer,
  addTask,
}) => {
  const [newTask, setNewTask] = useState<string>("");
  const [nDone, setNDone] = useState<number>(0);
  type sendTaskType = (data: string) => void;
  const sendTask: sendTaskType = (data) => {
    if (data === "") {
      alert("Поле ввода пустое");
    } else {
      let nowDate: Date = new Date();
      let year: number = nowDate.getFullYear();

      const setDataDayNow = (num: string) => {
        if (num.length === 1) {
          return "0" + num;
        } else {
          return num;
        }
      };
      let day: string = setDataDayNow(nowDate.getDate() + "");
      let month: string = setDataDayNow(nowDate.getMonth() + 1 + "");
      let hours: string = setDataDayNow(nowDate.getHours() + "");
      let minute: string = setDataDayNow(nowDate.getMinutes() + "");

      let objForArray: typeArrayData = {
        date: `${day}.${month}.${year}`,
        time: `${hours}:${minute}`,
        text: data,
        id: Math.floor(Math.random() * 100) + nowDate.getMilliseconds(),
        done: false,
        important: false,
      };
      addTask(objForArray);
    }
    setNewTask("");
  };
  const inputNewTask = (e: React.FormEvent<HTMLInputElement>): void => {
    setNewTask(e.currentTarget.value);
  };
  const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      sendTask(newTask);
    }
  };

  useEffect(() => {
    if (dataReducer.todoData === null) {
      setNDone(0);
    } else {
      setNDone(dataReducer.todoData.length);
    }
  }, [dataReducer]);
  return (
    <div style={{ marginTop: "20px", display: "flex" }}>
      <div className="input-group mb-3">
        <input
          type="text"
          className=" form-control"
          placeholder="введите новую задачу"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={newTask}
          onKeyDown={_handleKeyDown}
          onChange={inputNewTask}
        />
        <div className="input-group-append">
          <button
            className="btn  btn-info"
            onClick={() => sendTask(newTask)}
            type="button"
          >
            Добавить
          </button>
        </div>
      </div>
      <div className="compliteDone">
        <p> задач {nDone}</p>
      </div>
    </div>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(InputPanel);
