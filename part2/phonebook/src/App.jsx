import { useState, useEffect } from "react";
import { Person } from "./components/Person";
import { NewEntry } from "./components/NewEntry";
import { Filter } from "./components/Filter";
import { Notification } from "./components/Notification";
import bookService from "./services/book";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    status: "",
  });

  useEffect(() => {
    bookService
      .readAll()
      .then((returnedPersons) => setPersons(returnedPersons));
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
      bookService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: "", number: "" });

        setNotification({
          message: `Added ${newPerson.name}`,
          status: "successful",
        });

        setTimeout(() => {
          setNotification({ message: null, status: "" });
        }, 5000);
      });
    } else {
      const match = persons.find(
        (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
      );
      if (
        window.confirm(
          `${match.name} already exists in phonebook, replace the old number with a new one?`
        )
      ) {
        bookService.update(match, newPerson).then((returnedPerson) => {
          setPersons(
            persons.map(
              (p) =>
                p.name !== match.name
                  ? p
                  : { ...p, number: returnedPerson.number } // only change the number
            )
          );
          setNewPerson({ name: "", number: "" });
        });
      }
    }
  };

  const handleDelete = ({ id, name }) => {
    const foundPerson = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${foundPerson.name}?`)) {
      bookService
        .remove(id)
        .then((returnedPersons) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setNotification({
            message: `Information of ${name} has already been removed from server`,
            status: "error",
          });

          setTimeout(() => {
            setNotification({ message: null, status: "" });
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  // Make array of names that match filter
  const filtered = persons.filter((person) => matchFilter(person, filter));

  // make array of divs from filtered array
  const book = filtered.map((person) => (
    <Person
      key={person.id}
      person={person}
      deletePerson={() => handleDelete(person)}
    />
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
