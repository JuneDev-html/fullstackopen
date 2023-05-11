/* eslint-disable react/prop-types */
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  const allParts = parts.map((part, key) => <Part key={key} part={part} />);
  return <div>{allParts}</div>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return <p>Number of exercises: {total}</p>;
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name}: {exercises}
    </p>
  );
};
