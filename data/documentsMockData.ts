import { DocumentModel } from "@/types";

export const mockDocuments: DocumentModel[] = [
  {
    id: "1",
    name: "Smith Contract",
    type: "PDF",
    caseName: "Smith v. Johnson",
    version: 2.1,
    updatedAt: "2025-03-22",
  },
  {
    id: "2",
    name: "Legal Brief",
    type: "DOCX",
    caseName: "ABC Corp Merger",
    version: 1.0,
    updatedAt: "2025-03-21",
  },
  {
    id: "3",
    name: "Deposition Transcript",
    type: "PDF",
    caseName: "Doe Estate Planning",
    version: 1.3,
    updatedAt: "2025-03-20",
  },
  {
    id: "4",
    name: "Settlement Agreement",
    type: "PDF",
    caseName: "Smith v. Johnson",
    version: 3.2,
    updatedAt: "2025-03-19",
  },
  {
    id: "5",
    name: "Financial Statement",
    type: "XLSX",
    caseName: "ABC Corp Merger",
    version: 2.5,
    updatedAt: "2025-03-18",
  },
];
