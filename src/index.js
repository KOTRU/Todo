import React from "react";
import ReactDOM from "react-dom";
import Container from "@material-ui/core/Container";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { nanoid } from "nanoid";

const DATA = [
  {
    taskList: "Начнем",
    tasks: [
      {
        id: "id" + nanoid(),
        name: "Eat",
        completed: true,
        date: new Date(),
      },
      {
        id: "id" + nanoid(),
        name: "312312312312312312312312312312312312312312312312",
        completed: false,
        date: new Date(),
      },
      {
        id: "id" + nanoid(),
        name: "Sleep",
        completed: false,
        date: new Date(),
      },
    ],
  },
  {
    taskList: "Продолжим",
    tasks: [
      {
        id: "id" + nanoid(),
        name: "Eat",
        completed: true,
        date: new Date(),
      },
      {
        id: "id" + nanoid(),
        name: "312312312312312312312312312312312312312312312312",
        completed: false,
        date: new Date(),
      },
      {
        id: "id" + nanoid(),
        name: "Sleep",
        completed: false,
        date: new Date(),
      },
    ],
  },
];

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="sm">
      <App tasks={DATA} />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
