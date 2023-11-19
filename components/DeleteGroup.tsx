import React, { MouseEventHandler } from "react";
import { BsTrash } from "react-icons/bs";

type Props = {
  handleDeleteGroup: MouseEventHandler<HTMLButtonElement>;
};

const DeleteGroup = ({ handleDeleteGroup }: Props) => {
  return (
    <button
      className="text-xl text-red-600 h-full hover:bg-gray-200 transition-all rounded-md p-1 md:p-2 "
      onClick={handleDeleteGroup}
    >
      <BsTrash />
    </button>
  );
};

export default DeleteGroup;
