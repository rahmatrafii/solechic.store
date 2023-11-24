import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  options: string[];
  selected?: string;
  setSelected?: any;
};

const CustomDropDown = ({ options, selected, setSelected }: Props) => {
  return (
    <div className="w-max md:mr-3 mb-3 md:mb-0">
      <Listbox value={selected} onChange={(e: string) => setSelected(e)}>
        <div className={`relative w-max `}>
          <Listbox.Button className="relative w-full  flex justify-between items-center cursor-pointer rounded-sm bg-white sm:py-2 sm:px-3 py-1 px-2 text-left shadow-md sm:text-sm border">
            <span className="block truncate text-xs sm:text-sm">
              {selected}
            </span>
            <img
              src="/static/icon/chevron-up-down.svg"
              alt="up down"
              width={20}
              height={20}
              className="ml-4 object-contain"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? "bg-blue-600 text-white " : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomDropDown;
