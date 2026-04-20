import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from "../Pagination/Pagination.tsx";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";



export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        <button className={css.button}>Create note +</button>
      </header>

      {isLoading && <p>Loading...</p>}

      {data && data.notes && (
        <NoteList notes={data.notes} />
      )}

      {data && data.totalPages > 1 && 
        <Pagination
          pageCount={data.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      }
    </div>
  );
}