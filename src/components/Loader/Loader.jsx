import React from "react";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500">
        <FiLoader className="h-full w-full text-green-500" />
      </div>
    </div>
  );
};

export default Loader;
