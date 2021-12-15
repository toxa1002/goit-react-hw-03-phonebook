const Filter = ({ filter, onChange }) => {
    return (
        <input
            type="text"
            name="filter"
            value={filter}
            placeholder="Search by contacts"
            onChange={({ target }) => onChange(target.value)}
        />
    );
};
export default Filter;
