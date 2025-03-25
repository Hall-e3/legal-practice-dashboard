import { CaseModel, CaseSummary } from "@/types/case";

export const mockCaseSummary: CaseSummary = {
  active: 42,
  pending: 17,
  closed: 85,
  trend: 12.5,
};

export const cases: CaseModel[] = [
  {
    id: "1",
    caseNumber: "CS-2025-001",
    title: "Smith v. Johnson",
    client: "John Smith",
    status: "active",
    assignedTo: "Jane Doe",
    openDate: "2025-01-15",
    lastActivity: "2025-03-20",
  },
  {
    id: "2",
    caseNumber: "CS-2025-002",
    title: "ABC Corp Merger",
    client: "ABC Corporation",
    status: "active",
    assignedTo: "John Smith",
    openDate: "2025-02-03",
    lastActivity: "2025-03-22",
  },
  {
    id: "3",
    caseNumber: "CS-2025-003",
    title: "Doe Estate Planning",
    client: "Sarah Doe",
    status: "pending",
    assignedTo: "Alex Johnson",
    openDate: "2025-02-10",
    lastActivity: "2025-03-18",
  },
  {
    id: "4",
    caseNumber: "CS-2025-004",
    title: "XYZ Corp v. ABC Inc",
    client: "XYZ Corporation",
    status: "active",
    assignedTo: "John Smith",
    openDate: "2025-01-25",
    lastActivity: "2025-03-21",
  },
  {
    id: "5",
    caseNumber: "CS-2024-098",
    title: "Johnson Property Dispute",
    client: "Robert Johnson",
    status: "closed",
    assignedTo: "Jane Doe",
    openDate: "2024-11-12",
    lastActivity: "2025-02-28",
  },
];
