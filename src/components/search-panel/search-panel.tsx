import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
type typePropsSearchPanel = {
  searchList: (searchTask: string) => any;
};
const SearchPanel: React.FC<typePropsSearchPanel> = ({ searchList }) => {
  const [searchTask, setSearchTask] = useState<string>("");
  type sendTaskType = (data: string) => void;
  const sendText: sendTaskType = (data) => {
    searchList(data);
  };
  const inputText = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchTask(e.currentTarget.value);
  };
  useEffect(() => {
    sendText(searchTask);
  }, [searchTask]);

  return (
    <div>
      <input
        style={{ width: "240px" }}
        className=" form-control"
        type="text"
        value={searchTask}
        onChange={inputText}
        placeholder={"начните вводить для поиска"}
      />
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    searchList: (searchTask: string) =>
      dispatch({ type: "SEARCH_TASK", text: searchTask }),
  };
}
export default connect(null, mapDispatchToProps)(SearchPanel);
