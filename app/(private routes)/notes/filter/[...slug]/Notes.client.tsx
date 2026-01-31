"use client";
import { useState } from "react";
import css from "./page.module.css"
import { useDebouncedCallback } from "use-debounce";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import { useParams } from "next/navigation";
import { NoteTag } from "@/types/note";


const NotesClient = () => {
    const { slug } = useParams<{ slug: string[] }>()
    const tag: NoteTag | string = slug[0]
    console.log("Hello")
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("");
    const changeSearchQuery = useDebouncedCallback((newQuery: string) => { setCurrentPage(1); setSearchQuery(newQuery) }, 300)
    const { data } = useQuery({
        queryKey: ["notes", { searchQuery, currentPage, tag }],
        queryFn: () => fetchNotes({ searchText: searchQuery, page: currentPage, tag }),
        placeholderData: keepPreviousData,
        refetchOnMount: false
    })


    const notes = data?.notes ?? []
    const totalPages = data?.totalPages ?? 0
    return (
        <div className={css.app}>
            <main>
                <section>
                    <header className={css.toolbar}>
                        <SearchBox onSearch={changeSearchQuery} />
                        {totalPages > 1 && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        )}
                        <Link className={css.button} href="/notes/action/create">
                            Create note +
                        </Link>
                    </header>

                    {notes.length > 0 && <NoteList notes={notes} />}
                </section>
            </main>
        </div>
    );
}

export default NotesClient;