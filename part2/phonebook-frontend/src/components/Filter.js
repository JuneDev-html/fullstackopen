export const Filter = ({ filter, handleFilter }) => {
  return (
    <form>
      <div>
        Filter shown with:{" "}
        <input type="text" onChange={handleFilter} value={filter} />
      </div>
    </form>
  );
};
