import React from "react";

const CardsTotalItems = (props) => {
  return (
    <div>
      <div className="p-4 rounded-md w-2xs flex flex-col justify-between h-30 shadow-md hover:cursor-pointer">
        <div className="flex items-center justify-between font-medium">
          <h3>{props.title}</h3>
          <props.tagItem />
        </div>

        <h1 className="text-3xl font-medium">{props.number}</h1>
      </div>
      {/* Number itens */}
    </div>
  );
};

export default CardsTotalItems;
