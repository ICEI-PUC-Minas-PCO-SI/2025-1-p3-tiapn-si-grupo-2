const DataForm = (props) => {
  return (
    <div className="flex flex-col w-auto gap-2">
      <label htmlFor={props.name} className="text-lg">
        {props.content}
      </label>
      <input name={props.name} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
    </div>
  );
};

export default DataForm;
