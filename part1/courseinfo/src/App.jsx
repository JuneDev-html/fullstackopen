/* eslint-disable react/prop-types */
import React from "react";
import { Course } from "./components/Course";
import { data } from "./components/Data";

const App = () => {
  const [notes, setNotes] = React.useState(data);

  const allCourses = notes.map((course) => (
    <Course key={course.id} course={course} />
  ));
  return <div>{allCourses}</div>;
};

export default App;
