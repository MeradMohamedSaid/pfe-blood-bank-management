import { useEffect, useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon,
  LockClosedIcon,
  SquaresPlusIcon,
  XMarkIcon,
  CalendarDaysIcon,
  UserIcon,
  ArrowsUpDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

const CenterModal = ({ center, setCenterInfoModal, setInfoCenter }) => {
  const [classNameAtt, setClassNameAtt] = useState("");
  useEffect(() => {
    console.log(center);
    setClassNameAtt((old) => center.class);
    console.log("class : ", classNameAtt);
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setCenterInfoModal(true);
          setInfoCenter((old) => center);
        }}
        className="bg-white rounded-xl hover:border-red border hover:bg-red-100 border-transparent duration-300 p-4 cursor-pointer gap-4"
      >
        <div className="flex flex-row w-full justify-end items-center mb-2">
          {center.isAvailable ? (
            <p className="bg-green-400 text-white py-1 px-4 rounded-full text-xs w-fit ">
              Working Today
            </p>
          ) : (
            <p className="bg-red-400 text-white py-1 px-4 rounded-full text-xs w-fit ">
              Today Closed
            </p>
          )}
        </div>
        <div className="flex items-center mb-2 border-b border-red pb-2">
          <BuildingOfficeIcon className="w-6 text-red mr-2" />
          <p className="font-bold">{center.id}</p>
          <ArrowTopRightOnSquareIcon className="w-6 ml-auto text-red cursor-pointer hover:scale-110 duration-300 " />
        </div>
        <h1 className="font-bold text-xl">{center.name}</h1>
        <p className="text-xs mb-6">{center.address}</p>
        {/* data representation */}
        <p className="text-ms mb-1">Total Packets :</p>
        <div className="h-14 w-full relative overflow-hidden bg-red-100 rounded-lg border border-red">
          <div className="z-10 absolute w-fit border border-red right-1 top-1 bg-white p-1 rounded-lg">
            <p className="text-lg font-bold ">
              {center.current}
              <span className="text-xs text-slate-400 font-normal">
                /{center.stock}
              </span>
            </p>
          </div>
          {classNameAtt && (
            <div
              className={classNameAtt}
              style={center.styleCLass}
              onLoad={console.log(classNameAtt)}
            />
          )}
        </div>
      </div>
      {/* Center Cell Modal */}
      {/* Center Info Modal */}
    </>
  );
};

export default CenterModal;
