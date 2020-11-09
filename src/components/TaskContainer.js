import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Todo from "./Todo";
import Form from "./Form";
import { Button } from "@material-ui/core";

import { nanoid } from "nanoid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  paper: {
    padding: 0,
    maxWidth: "15rem",
  },
  invisiblePaper: {
    visibility: "hidden",
  },
  taskList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  buttonType: {
    textTransform: "none",
    padding: 2,
  },
  Btn: {
    border: 0,
    borderRadius: 3,
    width: "100%",
    margin: 0,
    display: "block",
    float: "left",
  },
}));

export default function TaskContainer(props) {
  const [isOpened, setIsOpened] = useState(true);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState(props.tasksList);

  const classes = useStyles();
  const taskList = tasks.filter(props.filter).map((task) => (
    <Grid item xs={12} key={task.id}>
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        date={task.date}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </Grid>
  ));
  function addTask(name, date) {
    const newTask = {
      id: "id" + nanoid(),
      name: name,
      completed: false,
      date: date,
    };
    setTasks([...tasks, newTask]);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName, newDate) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName, date: newDate };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  console.log(tasks);
  var taskListContentContainer = (
    <Grid
      item
      container
      xs={12}
      spacing={1}
      justify="center"
      direction="column"
      alignItems="center"
    >
      <Grid
        item
        container
        xs={12}
        spacing={2}
        justify="center"
        direction="column"
        alignItems="center"
      >
        {taskList}
      </Grid>
      <Grid item xs={12}>
        <Form addTask={addTask} />
      </Grid>
    </Grid>
  );
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Button
              className={classes.Btn}
              onClick={() => setIsOpened(!isOpened)}
            >
              <Typography className={classes.buttonType} variant="button">
                {props.name}
              </Typography>
            </Button>
          </Grid>
          {isOpened && taskListContentContainer}
        </Grid>
      </Paper>
    </div>
  );
}
