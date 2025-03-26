"use client";
import React, { useCallback, useState } from "react";
import { Card, MenuDropDown, Spinner } from "@/components";
import useDocument from "@/hooks/useDocument";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { DocumentModel } from "@/types";

const documentColumns: string[] = [
  "Name",
  "Case",
  "Version",
  "Updated",
  "Actions",
];

export default function RecentDocumentsWidget() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [currentDocument, setCurrentDocument] = useState<string>("");
  const { documents, isLoading, removeDocument } = useDocument();

  const handleOpenPopup = useCallback(
    (e: React.MouseEvent, document: DocumentModel) => {
      e.stopPropagation();
      setCurrentDocument(document?.id ?? "");
      setOpenPopup(true);
    },
    []
  );

  if (isLoading)
    return (
      <Card title="Recent Documents">
        <div className="flex justify-center items-center h-full">
          <Spinner styles="h-4 w-4 border-2 border-primary_color" />
        </div>
      </Card>
    );

  return (
    <Card title="Recent Documents">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {documentColumns.map((header) => (
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
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
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
                        {doc.name}
                      </div>
                      <div className="text-sm text-gray-500">{doc.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doc.caseName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    v{doc.version}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.updatedAt}
                </td>
                <td>
                  <div
                    onClick={(e) => handleOpenPopup(e, doc)}
                    className="p-1.5 rounded-md hover:bg-gray cursor-pointer"
                  >
                    <EllipsisHorizontalIcon className="h-4 w-4" />
                  </div>
                  <MenuDropDown
                    open={currentDocument === doc?.id ? openPopup : false}
                    close={() => setOpenPopup(false)}
                  >
                    <div
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="flex flex-col cursor-pointer duration-300 ease-in-out hover:bg-neutral_light"
                      onClick={() => removeDocument(doc.id ?? "")}
                    >
                      <div className="flex items-center space-x-2 py-2 px-4">
                        <p className="text-[13px] text-gray_color">Delete</p>
                      </div>
                    </div>
                  </MenuDropDown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
