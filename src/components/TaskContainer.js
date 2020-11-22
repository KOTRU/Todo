import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Todo from "./Todo";
import Form from "./Form";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { nanoid } from "nanoid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  paper: {
    padding: 0,
    background: "linear-gradient(45deg, #6bffc3 30%, #abf4d7 90%)",
    marginTop: "1.5rem",
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
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: "100%",
    padding: "0 30px",
  },
  Btn2: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "0px 30px",
  },
}));

export default function TaskContainer(props) {
  const [isOpened, setIsOpened] = useState(true);
  const [name, setName] = useState(props.name);
  const [tasks, setTasks] = useState(props.tasksList);
  const [isCreated, setIsCreated] = useState(props.isCreated);

  const classes = useStyles();
  const taskList = tasks.map((task) => (
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
  function addTask(taskName, date) {
    const newTask = {
      id: "id" + nanoid(),
      name: taskName,
      completed: false,
      date: date,
    };
    props.addNewTask(newTask, name);
    setTasks([...tasks, newTask]);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    props.deleteTask(name, id);
  }
  function editTask(id, newName, newDate) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName, date: newDate };
      }
      return task;
    });
    props.taskChange(name, id, newName, newDate);
    setTasks(editedTaskList);
  }
  function toggleTaskCompleted(id) {
    let state = false;
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        state = !task.completed;
        return { ...task, completed: state };
      }
      return task;
    });
    setTasks(updatedTasks);
    props.changeTaskCompletion(name, id, state);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      alert("Введите название");
      return;
    }
    props.addTaskList(name);
    setName("");
  }
  var taskListContentContainer = (
    <Grid
      item
      container
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
      <Grid
        item
        xs={11}
        style={{ float: "left", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        <Form addTask={addTask} />
      </Grid>
    </Grid>
  );
  const viewTemplate = (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column" alignItems="stretch">
          <Grid item xs={12}>
            <Button
              className={classes.Btn}
              onClick={() => setIsOpened(!isOpened)}
            >
              <Typography className={classes.buttonType} variant="button">
                {name}
              </Typography>
            </Button>
          </Grid>
          {isOpened && taskListContentContainer}
          <Button
            className={classes.Btn2}
            onClick={() => props.deleteContainer(name)}
          >
            <CloseIcon></CloseIcon>
          </Button>
        </Grid>
      </Paper>
    </div>
  );
  const createTemplate = (
    <form
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Paper className={classes.paper}>
        <Grid container spacing={1} direction="column" alignItems="center">
          <Grid item xs={12}>
            <TextField
              required
              id="standard-required"
              label="Задача"
              value={name}
              onChange={handleNameChange}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item container spacing={1} justify="center" xs={12}>
            <Grid item xs={12}>
              <Button
                className={classes.Btn}
                onClick={() => props.stopCreating()}
              >
                <Typography className={classes.buttonType} variant="button">
                  Отмена
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" className={classes.Btn}>
                <Typography className={classes.buttonType} variant="button">
                  Добавить
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
  return isCreated ? viewTemplate : createTemplate;
}
