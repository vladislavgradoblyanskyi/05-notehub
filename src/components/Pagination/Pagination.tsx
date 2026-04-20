import * as ReactPaginateImport from "react-paginate";
import css from './Pagination.module.css'
const Paginate =
  (ReactPaginateImport as any).default?.default ||
  (ReactPaginateImport as any).default ||
  ReactPaginateImport;
import type {PaginationProps} from '../../types/note'
export default function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    
    <Paginate
      pageCount={pageCount}
      onPageChange={(evt: { selected: number }) => onPageChange(evt.selected + 1)}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      activeClassName={css.active}
      pageClassName={css.page}
    />
  );
}
