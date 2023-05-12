import { useState, useEffect } from "react";
import axios from "axios";
import { Person } from "./components/Person";
import { NewEntry } from "./components/NewEntry";
import { Filter } from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  // update newPerson state onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPerson((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // update filter state onChange
  const handleFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  // Add new name when submitted
  const addName = (e) => {
    e.preventDefault();

    // check if name already exists before submitting
    let exists = false;
    persons.forEach((person) => {
      person.name.toLowerCase() === newPerson.name.toLowerCase()
        ? (exists = true)
        : exists;
    });

    // if not, then add it to persons state
    if (!exists) {
      setPersons((prevPersons) => {
        return [
          ...prevPersons,
          { name: newPerson.name, number: newPerson.number },
        ];
      });
      setNewPerson({ name: "", number: "" });
    } else {
      alert(`${newPerson.name} is already added to phonebook`);
    }
  };

  // Make array of names that match filter
  const filtered = persons.filter((person) => matchFilter(person, filter));

  // make array of divs from filtered array
  const book = filtered.map((person) => (
    <Person key={person.id} person={person} />
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <NewEntry
        newPerson={newPerson}
        addName={addName}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      {book}
    </div>
  );
};

const matchFilter = (person, filter) => {
  const personArray = person.name.split("");
  const filterArray = filter.split("");
  for (let i in filterArray) {
    if (personArray[i].toLowerCase() !== filterArray[i].toLowerCase()) {
      return false;
    }
  }
  return true;
};

export default App;
