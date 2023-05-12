export const NewEntry = ({ newPerson, addName, handleChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{" "}
        <input name="name" onChange={handleChange} value={newPerson.name} />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          name="number"
          onChange={handleChange}
          value={newPerson.number}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
