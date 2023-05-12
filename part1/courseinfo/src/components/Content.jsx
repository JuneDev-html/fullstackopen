import { Part } from "./Part";

export const Content = ({ parts }) => {
  const allParts = parts.map((part, key) => <Part key={key} part={part} />);
  return <div>{allParts}</div>;
};
