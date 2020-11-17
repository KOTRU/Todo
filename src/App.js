import TaskContainer from "./components/TaskContainer";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Grid from "@material-ui/core/Grid";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { db } from "./config";
import { ifObjectIsEmpty } from "./IsNullObject";
import { Paper } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
});
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);
const localizedNames = {
  All: "все",
  Active: "активные",
  Completed: "завершенные",
};

function addNewTask(task) {
  db.ref("/taskList/tasks").push({
    task: [...task],
  });
  this.setTasks({
    presentToDo: "",
  });
}

function App(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  function addNewTaskList(taskList) {
    db.ref("/taskList").push({
      taskList: taskList.Name,
      tasks: taskList.tasks,
    });
    //setTasks([...tasks, taskList]);
  }

  // addNewTaskList({
  //   Name: "FirstTask",
  //   tasks: [
  //     {
  //       id: "id" + nanoid(),
  //       name: "Eat",
  //       completed: true,
  //       date: new Date(),
  //     },
  //   ],
  // });
  const filterList = FILTER_NAMES.map((name) => (
    <Grid item xs={4} key={nanoid()}>
      <FilterButton
        key={name}
        localizedName={localizedNames[name]}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    </Grid>
  ));
  const headingText = `Списков -  ${
    ifObjectIsEmpty(tasks) ? tasks.length : 0
  } `;
  const taskContainers = ifObjectIsEmpty(tasks) ? (
    tasks.map((container) => (
      <li style={{ float: "left", marginLeft: "1rem" }} key={nanoid()}>
        <TaskContainer
          name={container.taskList}
          tasksList={container.tasks}
          filter={FILTER_MAP[filter]}
        />
      </li>
    ))
  ) : (
    <li> </li>
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Что надо сделать</h1>
        <div>
          <h3>Фильтры</h3>
          <Grid container>{filterList}</Grid>
        </div>
        <h2 id="list-heading">{headingText}</h2>
        <ul style={{ listStyleType: "none" }}> {taskContainers}</ul>
      </div>
    </ThemeProvider>
  );
}

export default App;
