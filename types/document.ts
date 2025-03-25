export interface Document {
  id: string;
  name: string;
  type: string;
  caseName: string;
  version: number;
  updatedAt: string;
}

export interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
}
