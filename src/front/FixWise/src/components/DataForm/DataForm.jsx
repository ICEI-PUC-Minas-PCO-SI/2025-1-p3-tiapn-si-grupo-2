const DataForm = (props) => {
  return (
    <input name={props.name} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
  );
};

export default DataForm;
