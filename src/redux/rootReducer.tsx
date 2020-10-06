export type typeArrayData = {
  id: number;
  text: string;
  time: string;
  date: string;
  done: boolean;
  important: boolean;
};
export type typeState = {
  todoData: Array<typeArrayData> | null;
  filter: "all" | "done" | "active";
  search: string;
};
let initialState: typeState = {
  // todoData: null,
  todoData: [
    {
      text: "Test task",
      time: "15:57",
      date: "05.10.2020",
      done: false,
      important: false,
      id: 5,
    },
  ],
  filter: "all",
  search: "",
};

export default function (
  state: typeState = initialState,
  action: any
): typeState {
  switch (action.type) {
    case "ADD_TASK":
      let obj: typeArrayData = action.newTaskR;

      if (state.todoData === null) {
        return {
          ...state,
          todoData: [obj],
        };
      }
      return {
        ...state,
        todoData: [obj, ...state.todoData],
      };
    case "REMOVE_TASK":
      if (state.todoData !== null) {
        const idx: number = state.todoData.findIndex(
          (el) => el.id === action.id
        );
        const newArray: typeArrayData[] = [
          ...state.todoData.slice(0, idx),
          ...state.todoData.slice(idx + 1),
        ];
        return {
          ...state,
          todoData: newArray,
        };
      }
    case "DONE_TASK":
      if (state.todoData !== null) {
        const idx: number = state.todoData.findIndex(
          (el) => el.id === action.id
        );
        let obj = state.todoData[idx];
        const doneObj: typeArrayData = {
          id: obj.id,
          text: obj.text,
          time: obj.time,
          date: obj.date,
          done: !obj.done,
          important: obj.important,
        };
        const newArray: typeArrayData[] = [
          ...state.todoData.slice(0, idx),
          doneObj,
          ...state.todoData.slice(idx + 1),
        ];
        return {
          ...state,
          todoData: newArray,
        };
      }
    case "IMPORTANT_TASK":
      if (state.todoData !== null) {
        const idx: number = state.todoData.findIndex(
          (el) => el.id === action.id
        );
        let obj = state.todoData[idx];
        const doneObj: typeArrayData = {
          id: obj.id,
          text: obj.text,
          time: obj.time,
          date: obj.date,
          done: obj.done,
          important: !obj.important,
        };
        const newArray: typeArrayData[] = [
          ...state.todoData.slice(0, idx),
          doneObj,
          ...state.todoData.slice(idx + 1),
        ];
        return {
          ...state,
          todoData: newArray,
        };
      }
    case "EDIT_TASK":
      if (state.todoData !== null) {
        const idx: number = state.todoData.findIndex(
          (el) => el.id === action.id
        );
        let obj = state.todoData[idx];
        const doneObj: typeArrayData = {
          id: obj.id,
          /////вставить текст
          text: action.editT,
          time: obj.time,
          date: obj.date,
          done: obj.done,
          important: obj.important,
        };
        const newArray: typeArrayData[] = [
          ...state.todoData.slice(0, idx),
          doneObj,
          ...state.todoData.slice(idx + 1),
        ];
        return {
          ...state,
          todoData: newArray,
        };
      }
    case "FILTER_LIST":
      return {
        ...state,
        filter: action.filter,
      };
    case "SEARCH_TASK":
      return {
        ...state,
        search: action.text,
      };

    default:
      return state;
  }
}
