import css from './Pagination.module.css';
import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

export interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({pageCount,currentPage,onPageChange,}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      activeClassName={css.active}
      pageClassName={css.page}
      forcePage={currentPage - 1}
      onPageChange={(evt: { selected: number }) => onPageChange(evt.selected + 1)}
    />
  );
}
