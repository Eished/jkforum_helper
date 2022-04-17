export const ToggleA = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="toogleA" type="checkbox" className="sr-only" />

          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>

        <div className="ml-3 text-gray-700 font-medium">Toggle Me!</div>
      </label>
    </div>
  );
};
export const ToggleB = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" id="toggleB" className="sr-only" />
          <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">Toggle Me!</div>
      </label>
    </div>
  );
};
