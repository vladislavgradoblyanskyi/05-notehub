export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}
export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}
export interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}
