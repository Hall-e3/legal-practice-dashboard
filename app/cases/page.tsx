"use client";
import {
  Button,
  MenuDropDown,
  Notification,
  SearchInput,
  Spinner,
} from "@/components";
import { InputType, Screens } from "@/enums";
import useAuth from "@/hooks/useAuth";
import useCase from "@/hooks/useCase";
import { useNotification } from "@/hooks/useNotification";
import { CaseModel } from "@/types";
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { capitalize } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useApp from "@/hooks/useApp";
import AddCaseModal from "@/components/modals/AddCaseModal";
const caseColumns: string[] = [
  "Title",
  "Status",
  "Client",
  "Assigned To",
  "Open Date",
  "Actions",
];
export default function Cases() {
  const { userInfo } = useAuth();
  const { toggleOpenModal, openModal } = useApp();
  const { cases, getCases, isLoading, removeCase } = useCase();
  const [search, setSearch] = useState<string>("");
  const [currentCase, setCurrentCase] = useState<string>("");
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const { error, hideAlert, component, message } = useNotification();

  const memozidedCases = useMemo(() => {
    return cases || [];
  }, [cases]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const filteredCases = useMemo(() => {
    return memozidedCases.filter((item: CaseModel) =>
      item?.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [memozidedCases, search]);

  const myCase = filteredCases.find(
    (item: CaseModel) => item.id === currentCase
  );

  const handleAddClick = () => {
    toggleOpenModal(true);
  };

  const handleCloseAddEdit = () => {
    toggleOpenModal(false);
    setCurrentCase("");
  };

  const handleOpenPopup = useCallback(
    (e: React.MouseEvent, thisCase: CaseModel) => {
      e.stopPropagation();
      setCurrentCase(thisCase?.id ?? "");
      setOpenPopup(true);
    },
    []
  );

  const handleOpenModal = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    if (item === "Edit") {
      toggleOpenModal(true);
    } else {
      if (currentCase) {
        removeCase(currentCase);
      }
    }
  };

  useEffect(() => {
    getCases();
  }, [getCases]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, hideAlert, message]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex flex-col space-y-10">
        <div>
          <h3 className="text-title-xsm font-medium text-black">Legal Cases</h3>
          <p className="text-gray_color text-[13px] sm:text-[15px] text-center sm:text-start">
            Hey admin{" "}
            <span className="text-accent_coral font-medium">
              {userInfo && capitalize(userInfo?.name ?? "")}
            </span>{" "}
            this is where you add your legal cases.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex flex-col space-y-3">
              <div className="flex-1">
                <SearchInput
                  type={InputType.text}
                  value={search ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearch(e)
                  }
                  styles="h-10 px-2 bg-white rounded-md w-full"
                  inputStyles="bg-white"
                  placeholder="Search by title,author or keyword"
                  iconRight={
                    <div
                      className="cursor-pointer flex items-center justify-center h-7 w-7 rounded-full bg-accent_coral text-white transition ease-out duration-300"
                      onClick={() => {}}
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </div>
                  }
                />
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center">
                  <Spinner styles="h-10 w-10 border-2 border-accent_coral" />
                </div>
              ) : (
                <>
                  {filteredCases?.length === 0 ? (
                    <div className="text-center py-4">
                      {search?.trim() ? (
                        <p className="text-sm text-gray_color">
                          No cases found matching {search}
                        </p>
                      ) : (
                        <p className="text-sm">
                          You have no cases created yet! Please create/add a
                          case
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {caseColumns.map((header) => (
                              <th
                                key={header}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredCases.map((thisCase) => (
                            <tr key={thisCase.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <svg
                                      className="h-5 w-5 text-gray-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {thisCase.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {thisCase.caseNumber}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {thisCase.status}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {thisCase.client}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {thisCase.openDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {thisCase.assignedTo}
                              </td>
                              <td>
                                <div
                                  onClick={(e) => handleOpenPopup(e, thisCase)}
                                  className="p-1.5 rounded-md hover:bg-gray cursor-pointer"
                                >
                                  <EllipsisHorizontalIcon className="h-4 w-4" />
                                </div>
                                <MenuDropDown
                                  open={
                                    currentCase === thisCase?.id
                                      ? openPopup
                                      : false
                                  }
                                  close={() => setOpenPopup(false)}
                                >
                                  {["Edit", "Delete"].map((item) => (
                                    <div
                                      key={item}
                                      data-te-ripple-init
                                      data-te-ripple-color="light"
                                      className="flex flex-col cursor-pointer duration-300 ease-in-out hover:bg-neutral_light"
                                      onClick={(e) => handleOpenModal(e, item)}
                                    >
                                      <div className="flex items-center space-x-2 py-2 px-4">
                                        <p className="text-[13px] text-gray_color">
                                          {item}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </MenuDropDown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="order-first md:order-last">
            <div className="px-4 flex flex-col space-y-6 rounded-lg bg-white py-7 dark:border-strokedark dark:bg-boxdark">
              <h4 className="text-sm  text-gray_black">
                You have no <span className="text-accent_coral">cases</span>{" "}
                yet. Please create a case.
              </h4>

              <div className="flex items-center justify-end">
                <Button
                  text="Create a case"
                  onClick={handleAddClick}
                  icon={<PlusIcon className="w-4 h-4" />}
                  buttonStyle={`shadow-lg drop-shadow-md animation-ripple py-3 text-white font-medium rounded-md text-sm px-5 text-center bg-primary_color opacity-75 hover:opacity-65`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{component === Screens.case && message && <Notification />}</div>
      <AddCaseModal
        isOpen={openModal}
        close={handleCloseAddEdit}
        screen={Screens.case}
        error={error}
        component={component}
        toBeEdited={myCase || null}
      />
    </DashboardLayout>
  );
}
