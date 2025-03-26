export interface DocumentModel {
  id: string;
  name: string;
  type: string;
  caseName: string;
  version: number;
  updatedAt: string;
}

export interface DocumentState {
  documents: DocumentModel[];
  isLoading: boolean;
  error: string | null;
}
