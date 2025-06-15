const CardsTotalItems = (props) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <props.tagItem className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{props.title}</dt>
              <dd>
                <div className="text-lg font-semibold text-gray-900">{props.number}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <span className={`font-medium ${props.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {props.change}
          </span>{' '}
          <span className="text-gray-500">em relação ao mês passado</span>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="p-4 rounded-md w-2xs flex flex-col justify-between h-30 shadow-md hover:cursor-pointer">
    //     <div className="flex items-center justify-between font-medium">
    //       <h3>{props.title}</h3>
    //       <props.tagItem />
    //     </div>

    //     <h1 className="text-3xl font-medium">{props.number}</h1>
    //   </div>
    //   {/* Number itens */}
    // </div>
  );
};

export default CardsTotalItems;
