import { useState } from "react";

const EnergyProductionCard = (props) => {
  //   if (props.hasAnomaly) {
  //     return (
  //       <div className="relative border border-red-500 rounded-lg">
  //         <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm rounded-bl-lg">
  //           Anomaly
  //         </div>
  //         <div className="flex flex-col items-center gap-2 p-6 pb-2">
  //           <span className="block text-gray-600 text-sm font-medium">
  //             {props.day}
  //           </span>
  //           <span className="block text-xs text-gray-500">{props.date}</span>
  //         </div>
  //         <div className="p-6 pt-2 flex flex-col items-center">
  //           <span className="block mb-1 text-3xl font-bold text-red-600">
  //             {props.production}
  //           </span>
  //           <span className="block text-sm font-medium text-gray-500">kWh</span>
  //         </div>
  //       </div>
  //     );
  //   }

  const [isSelected, setIsSelected] = useState(false);
  // const [num, setNum] = useState(0);
  // const [user, setUser] = useState({ name: "Manupa", age: 24 });
  // const [nums, setNums] = useState([2, 3, 5, 7]);

  const handleClick = () => {
    setIsSelected(!isSelected);
    // setNum(num + 5);
    // setNum((n) => n + 1);
    // setNum(42);
    // setUser({ ...user, age: 25 });
    // setNums( [...nums, 11] );
  };

  return (
    <button
      className={`block cursor-pointer ${
        isSelected ? "outline-2 outline-offset-2 outline-blue-600" : ""
      } relative border ${
        props.hasAnomaly ? "border-red-500" : "border-gray-300"
      } rounded-lg transition-all hover:shadow-md`}
      onClick={handleClick}
      title={props.hasAnomaly ? props.anomalyReason : "Normal operation"}
    >
      {props.hasAnomaly && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm rounded-bl-lg">
          Anomaly
        </div>
      )}
      <div className="flex flex-col items-center gap-2 p-6 pb-2">
        <span className="block text-gray-600 text-sm font-medium">
          {props.day}
        </span>
        <span className="block text-xs text-gray-500">{props.date}</span>
      </div>
      <div className="p-6 pt-2 flex flex-col items-center">
        <span
          className={`block mb-1 text-3xl font-bold ${
            props.hasAnomaly ? "text-red-600" : "text-blue-600"
          }`}
        >
          {props.production}
        </span>
        <span className="block text-sm font-medium text-gray-500">kWh</span>

        {/* Show anomaly type and reason when detected */}
        {props.hasAnomaly && props.anomalyType && (
          <div className="mt-2 px-2 py-1 bg-red-50 rounded text-xs text-red-700">
            {props.anomalyType}
          </div>
        )}
      </div>

      {/* Detailed reason shown on hover/click */}
      {isSelected && props.hasAnomaly && props.anomalyReason && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
          <div className="font-semibold mb-1">Why is this an anomaly?</div>
          <div>{props.anomalyReason}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </button>
  );
};

export default EnergyProductionCard;
