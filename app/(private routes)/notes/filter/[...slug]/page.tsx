import { fetchNotes } from "@/lib/api/serverApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";


import { Metadata } from 'next';

interface NotesPageProps {
    params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug[0];
    const title = `Notes - ${tag}`;
    const description = `Browse your notes filtered by ${tag}.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/notes/filter/${tag}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ]
        }
    };
}

const NotesPage = async ({ params }: NotesPageProps) => {
    const { slug } = await params;
    const tag: NoteTag | string = slug[0]
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['notes', { searchText: "", currentPage: 1, tag }], queryFn: () => fetchNotes({ tag }) })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    )
}

export default NotesPage;