import type { NewNoteContent, Note } from "../../types/note";
import { nextServer } from "./api";

interface FetchNotesResponse {
    notes: Note[]
    totalPages: number
}

interface FetchNotesProps {
    searchText?: string;
    page?: number;
    tag?: string;
}
interface SignUpData {
    email: string;
    password: string;
}
interface SignInData {
    email: string;
    password: string;
}




export const fetchNotes = async ({ searchText = '', page = 1, tag }: FetchNotesProps) => {


    const response = await nextServer.get<FetchNotesResponse>('/notes', {
        params: {
            page,
            perPage: 12,
            ...(searchText && searchText !== "" && { search: searchText }),
            ...(tag && tag !== "all" && { tag })
        },
    });
    return response.data;
};



export const createNote = async (newNote: NewNoteContent) => {
    const { data } = await nextServer.post<Note>("/notes", newNote)
    return data
}
export const deleteNote = async (noteId: string) => {
    const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
    return data
}



export const fetchNoteById = async (noteId: string) => {
    const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
    return data
}

export const register = async (credentials: SignUpData) => {
    const { data } = await nextServer.post("/auth/register", credentials);
    return data;
};
export const login = async (credentials: SignInData) => {
    const { data } = await nextServer.post("/auth/login", credentials);
    return data;
};
export const logout = async () => {
    const { data } = await nextServer.post("/auth/logout");
    return data;
};

export const checkSession = async () => {
    const response = await nextServer.get(`/auth/session`);
    return response.data.success
}
export const getMe = async () => {
    const { data } = await nextServer.get(`/users/me`);
    return data
}
export const updateMe = async (userData: { username: string }) => {
    const { data } = await nextServer.patch("/users/me", userData);
    return data;
};