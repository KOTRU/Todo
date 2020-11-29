import TaskContainer from "./components/TaskContainer";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Grid from "@material-ui/core/Grid";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { db } from "./config";
import { ifObjectIsEmpty } from "./IsNullObject";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
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

function addNewTask(task, id) {
  let newTask = db.ref(id).child("/tasks").push();
  let taskKey = newTask.key;
  task.id = taskKey;
  task.date = task.date.getTime();
  newTask.set(task);
  console.log(task);
  return taskKey;
}

function addNewTaskList(taskList) {
  let newTaskList = db.ref().push();
  let taskKey = newTaskList.key;
  taskList.id = taskKey;
  newTaskList.set(taskList);
  return taskKey;
}
function App(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  function handleTaskListCreationStart() {
    let task = {
      taskList: "",
      id: nanoid(),
      tasks: [
        {
          id: -1,
          name: "temp",
          completed: true,
          date: new Date(),
        },
      ],
      isCreated: false,
    };
    setTasks([...tasks, task]);
  }
  function handleTaskListCreationEnd(id, name) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        task.taskList = name;
        task.isCreated = true;
        task.id = addNewTaskList(task);
        task.tasks = task.tasks.filter((task) => task.id != -1);

        return {
          ...task,
          taskList: name,
          isCreated: true,
          id: task.id,
          tasks: task.tasks,
        };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  function handleStopTaskListCreation(id) {
    const tasksFiltred = tasks.filter((task) => task.id != id);
    setTasks(tasksFiltred);
  }
  function handleAddNewTask(task, id) {
    task.id = addNewTask(task, id);
    tasks.map((Ttask) => {
      if (Ttask.id == id) {
        Ttask.tasks = [...Ttask.tasks, task];
      }
    });
  }
  function handleTaskCompletion(id, taskId, state) {
    db.ref(id).child("/tasks").child(taskId).update({ completed: state });
  }
  function handleTaskDeletion(id, taskId) {
    db.ref(id).child("/tasks").child(taskId).remove();
  }
  function handleTaskChange(id, taskId, newName, newDate) {
    db.ref(id)
      .child("/tasks")
      .child(taskId)
      .update({ name: newName, date: newDate.getTime() });
  }
  function handleDeleteContainer(id) {
    db.ref(id).remove();
    setTasks(tasks.filter((tTaskList) => tTaskList.id != id));
  }

  const headingText = `Списков -  ${
    ifObjectIsEmpty(tasks) ? tasks.length : 0
  } `;
  const taskContainers = ifObjectIsEmpty(tasks) ? (
    tasks.map((container) => (
      <Grid
        item
        xs={5}
        style={{ float: "left", marginLeft: "1rem", marginBottom: "1rem" }}
        key={nanoid()}
      >
        <TaskContainer
          id={container.id}
          name={container.taskList}
          tasksList={container.tasks}
          isCreated={container.isCreated}
          addTaskList={handleTaskListCreationEnd}
          stopCreating={handleStopTaskListCreation}
          addNewTask={handleAddNewTask}
          changeTaskCompletion={handleTaskCompletion}
          deleteTask={handleTaskDeletion}
          taskChange={handleTaskChange}
          deleteContainer={handleDeleteContainer}
        />
      </Grid>
    ))
  ) : (
    <li> </li>
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Что надо сделать</h1>
        <h2 id="list-heading">{headingText}</h2>
        <Grid container spacing={1} alignItems="baseline">
          <Grid item container justify="center" xs={10}>
            {taskContainers}
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => handleTaskListCreationStart()}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
