import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import DateFnsUtils from "@date-io/date-fns";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const [newDate, setNewDate] = useState(new Date());

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 0,
      padding: 0,
    },
    paper: {
      padding: theme.spacing(2),
      background: "linear-gradient(45deg, #6bffc3 30%, #abf4d7 90%)",
      maxWidth: "15rem",
    },
    editBtn: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      width: "100%",
      padding: "0 30px",
    },
    buttonType: {
      textTransform: "none",
      padding: 2,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  }));
  const classes = useStyles();

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName, newDate);
    setEditing(false);
  }

  const editingTemplate = (
    <form
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={1}
          justify="center"
          direction="column"
          alignItems="center"
        >
          <Grid item zeroMinWidth xs={12}>
            <Typography noWrap variant="subtitle1">
              Изменение {props.name}
            </Typography>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            alignItems="center"
            direction="row"
            xs={12}
          >
            <TextField
              required
              id="standard-required"
              label="Задача"
              value={newName}
              onChange={handleNameChange}
              style={{ width: "100%" }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <DateTimePicker
                value={newDate}
                onChange={setNewDate}
                format="d MMM yyyy"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid container item spacing={1} justify="center" xs={12}>
            <Grid item xs={12}>
              <Button
                className={classes.editBtn}
                onClick={() => setEditing(false)}
              >
                <Typography className={classes.buttonType} variant="button">
                  Отмена
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" className={classes.editBtn}>
                <Typography className={classes.buttonType} variant="button">
                  Сохранить
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
  const viewTemplate = (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={1}
          justify="center"
          direction="column"
          alignItems="center"
        >
          <Grid
            item
            container
            spacing={1}
            justify="center"
            alignItems="center"
            direction="row"
            xs={12}
          >
            <Grid item xs={3}>
              <Switch
                color="primary"
                checked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
              ></Switch>
            </Grid>
            <Grid item zeroMinWidth xs={9}>
              <Typography noWrap variant="subtitle1">
                {props.name}
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <DateTimePicker
                  value={props.date}
                  disabled
                  format="d MMM yyyy HH mm"
                />
              </MuiPickersUtilsProvider>{" "}
            </Grid>
          </Grid>
          <Grid container item spacing={1} justify="center" xs={12}>
            <Grid item xs={12}>
              <Button
                className={classes.editBtn}
                onClick={() => setEditing(true)}
              >
                <Typography className={classes.buttonType} variant="button">
                  Изменить
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.editBtn}
                onClick={() => props.deleteTask(props.id)}
              >
                <Typography className={classes.buttonType} variant="button">
                  Удалить
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
  return isEditing ? editingTemplate : viewTemplate;
}
