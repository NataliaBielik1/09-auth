import { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
    title: "Create Note - NoteHub",
    description: "Create a new note to organize your thoughts and tasks.",
    openGraph: {
        title: "Create Note - NoteHub",
        description: "Create a new note to organize your thoughts and tasks.",
        url: "/notes/action/create",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Create Note - NoteHub"
            }
        ]
    }
};

export default function CreateNotePage() {
    return <CreateNoteClient />;
}