"use client";
import { CaseModel } from "@/types";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { Button, Modal, TextInput } from "@/components";
import { ButtonType, Screens } from "@/enums";
import useCase from "@/hooks/useCase";
import { v4 as uuidv4 } from "uuid";

interface AddCaseModalProps {
  isOpen: boolean;
  close: () => void;
  screen: string;
  error: string;
  component: string;
  toBeEdited: CaseModel | null;
}

const initialCaseValues: CaseModel = {
  caseNumber: "",
  title: "",
  client: "",
  status: "",
  assignedTo: "",
  openDate: "",
};

const AddCaseModal: React.FC<AddCaseModalProps> = ({
  isOpen,
  close,
  screen,
  error,
  component,
  toBeEdited,
}) => {
  const isEditMode = Boolean(toBeEdited);
  const { addCase, editCase, isLoading } = useCase();
  const [values, setValues] = useState(initialCaseValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const autoGenerateCaseId = () => {
    return uuidv4();
  };

  const generateCaseNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    setValues({
      ...values,
      caseNumber: `CASE-${year}${month}${day}-${random}`,
      id: autoGenerateCaseId(),
    });
  };

  useEffect(() => {
    if (isOpen && toBeEdited) {
      setValues(toBeEdited);
    } else if (!isOpen) {
      setValues(initialCaseValues);
    }
  }, [isOpen, toBeEdited]);

  const handleSubmit = () => {
    if (isEditMode) {
      editCase(values);
    } else {
      if (
        values.caseNumber &&
        values.client &&
        values.openDate &&
        values.title &&
        values.lastActivity
      ) {
        addCase(values);
      }
    }
  };

  return (
    <Modal
      styles="p-6"
      isOpen={isOpen && screen === Screens.case}
      onClose={() => {
        close();
        setValues(initialCaseValues);
      }}
      body={
        <div className="flex flex-col space-y-2">
          {isLoading && (
            <div className="bg-green-100 p-4 rounded-md flex items-center space-x-3">
              <Spinner styles="h-4 w-4 border-2 border-tertiary_dark" />
              {isEditMode ? (
                <p className="text-sm text-gray_color">Update in Progress...</p>
              ) : (
                <p className="text-sm text-gray_color">
                  Creation in Progress...
                </p>
              )}
            </div>
          )}
          <div className="flex items-center space-x-4">
            <TextInput
              label="Enter Case Title"
              value={values.title ?? ""}
              name="title"
              onChange={handleInputChange}
              styles="ring rounded-md h-14"
            />
            <TextInput
              label="Enter Case Client"
              value={values.client ?? ""}
              name="client"
              onChange={handleInputChange}
              styles="ring rounded-md h-14"
            />
          </div>
          <TextInput
            label="Enter Case assignedTo"
            value={values.assignedTo ?? ""}
            name="assignedTo"
            onChange={handleInputChange}
            styles="ring rounded-md h-14"
          />
          <TextInput
            label="Enter Case Number"
            value={values.caseNumber ?? ""}
            name="caseNumber"
            onChange={handleInputChange}
            styles="ring rounded-md h-14"
            onFocus={generateCaseNumber}
          />

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <TextInput
                label="Enter Case Open Date"
                value={values.openDate ?? ""}
                name="openDate"
                onChange={handleInputChange}
                styles="ring rounded-md h-14"
                type="date"
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Enter Case lastActivity"
                value={values.lastActivity ?? ""}
                name="lastActivity"
                onChange={handleInputChange}
                styles="ring rounded-md h-14"
              />
            </div>
          </div>
          {component === Screens.case && error && (
            <p className="text-[13px] text-red-600">{error}</p>
          )}
        </div>
      }
      footer={
        <div className="mt-4 flex items-center justify-between space-x-6">
          <Button
            text="Cancel"
            type={ButtonType.button}
            buttonStyle="w-full py-3 ring-accent_coral hover:bg-accent_coral hover:text-white hover:ring-white text-tertiary_dark font-medium text-[14px] rounded-md px-5 text-center"
            onClick={() => {
              close();
              setValues(initialCaseValues);
            }}
            outline
          />
          <Button
            type={ButtonType.submit}
            text="Submit"
            disabled={
              !values.caseNumber &&
              !values.client &&
              !values.openDate &&
              !values.title &&
              !values.lastActivity
            }
            buttonStyle="w-full py-3 text-white font-medium text-[14px] rounded-md px-5 text-center bg-primary_color opacity-75 hover:opacity-65"
            onClick={handleSubmit}
          />
        </div>
      }
      leftIcon={
        isEditMode ? (
          <h3 className="text-md font-medium leading-6">Edit a case</h3>
        ) : (
          <h3 className="text-md font-medium leading-6">Add a case</h3>
        )
      }
      modalStyle="w-full sm:w-[50%] md:w-[30%]"
      closeButtonStyles="rounded-full p-2 bg-background_color_second cursor-pointer"
    />
  );
};

export default AddCaseModal;
