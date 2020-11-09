import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  paper: {
    padding: theme.spacing(2),
    background: "linear-gradient(45deg, #6bffc3 30%, #abf4d7 90%)",
    marginTop: "1.5rem",
    maxWidth: "15rem",
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

export default function Form(props) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isCreating, setCreating] = useState(false);

  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      alert("Введите название");
      return;
    }
    props.addTask(name, startDate);
    setName("");
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }

  const creatingTemplate = (
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
              value={name}
              onChange={handleNameChange}
              style={{ width: "100%" }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <DateTimePicker
                value={startDate}
                onChange={setStartDate}
                format="d MMM yyyy"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid container item spacing={1} justify="center" xs={12}>
            <Grid item xs={12}>
              <Button
                className={classes.Btn}
                onClick={() => setCreating(false)}
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
  const viewTemplate = (
    <Button className={classes.Btn} onClick={() => setCreating(true)}>
      <Typography className={classes.buttonType} variant="button">
         Добавить
      </Typography>
    </Button>
  );
  return isCreating ? creatingTemplate : viewTemplate;
}
