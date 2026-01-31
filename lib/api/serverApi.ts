import { NewNoteContent, Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";



interface FetchNotesResponse {
    notes: Note[]
    totalPages: number
}

interface FetchNotesProps {
    searchText?: string;
    page?: number;
    tag?: string;
}



export const fetchNotes = async ({ searchText = '', page = 1, tag }: FetchNotesProps) => {
    const cookieStore = await cookies()

    const response = await nextServer.get<FetchNotesResponse>('/notes', {
        params: {
            page,
            perPage: 12,
            ...(searchText && searchText !== "" && { search: searchText }),
            ...(tag && tag !== "all" && { tag })
        },
        headers: { Cookie: cookieStore.toString() }
    });
    return response.data;
};



export const fetchNoteById = async (noteId: string) => {
    const cookieStore = await cookies()
    const { data } = await nextServer.get<Note>(`/notes/${noteId}`, { headers: { Cookie: cookieStore.toString() } });
    return data
}

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies()
    const { data } = await nextServer.get<User>(`/users/me`, { headers: { Cookie: cookieStore.toString() } });
    return data
}
export const checkSession = async () => {
    const cookieStore = await cookies()
    const response = await nextServer.get(`/auth/session`, { headers: { Cookie: cookieStore.toString() } });
    return response
}