import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}
console.log(ReactPaginate);
export default function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(evt) => onPageChange(evt.selected + 1)}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
    />
  );
}