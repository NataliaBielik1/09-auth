"use client"
import css from "./NoteForm.module.css"
import type { NewNoteContent, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";

interface NoteFormProps {
    onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
    const queryClient = useQueryClient()
    const { draft, setDraft, clearDraft } = useNoteStore()

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
            clearDraft()
            onClose()
        }
    })

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tag = formData.get("tag") as NoteTag;

        const newNote: NewNoteContent = {
            title,
            content,
            tag,
        }

        mutation.mutate(newNote)
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setDraft({ [name]: value } as Partial<typeof draft>);
    };

    return (
        <form action={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    className={css.input}
                    value={draft.title}
                    onChange={handleInputChange}
                    required
                    minLength={3}
                    maxLength={50}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    value={draft.content}
                    onChange={handleInputChange}
                    maxLength={500}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select
                    id="tag"
                    name="tag"
                    className={css.select}
                    value={draft.tag}
                    onChange={handleInputChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={onClose}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={mutation.isPending}
                >
                    Create note
                </button>
            </div>
        </form>
    )
}

export default NoteForm;