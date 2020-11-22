import React from "react";
import ReactDOM from "react-dom";
import Container from "@material-ui/core/Container";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { nanoid } from "nanoid";
import { db } from "./config";
import { ifObjectIsEmpty } from "./IsNullObject";
let tempTasks = [];
let ref = db.ref("/");
ref.once("value", (querySnapShot) => {
  let data = querySnapShot.val() ? querySnapShot.val() : {};
  if (ifObjectIsEmpty(data)) {
    tempTasks = Object.values(data);
    console.log(tempTasks);
    tempTasks = tempTasks.map((temp) => {
      return {
        ...temp,
        tasks: Object.values(temp.tasks)
          .filter((task) => task.id != -1)
          .map((task) => {
            return { ...task, date: new Date(task.date) };
          }),
      };
    });
  }
  ReactDOM.render(
    <React.StrictMode>
      <Container maxWidth="md">
        <App tasks={tempTasks} />
      </Container>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
