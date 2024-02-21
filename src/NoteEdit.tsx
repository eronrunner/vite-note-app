import { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

type NewNoteProps = {
  onUpdate: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NoteEdit({onUpdate, onAddTag, availableTags}: NewNoteProps) {

  const note = useNote()

  return (
    <>
      <div className="mb-4">
        <h1>Edit {note.title}</h1>
      </div>
      <NoteForm note={note} onSubmit={(data) => onUpdate(note.id, data)} onAddTag={onAddTag} availableTags={availableTags}></NoteForm>
    </>
  );
}
