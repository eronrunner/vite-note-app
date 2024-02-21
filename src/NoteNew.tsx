import { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NoteNew({onSubmit, onAddTag, availableTags}: NewNoteProps) {
  return (
    <>
      <div className="mb-4">
        <h1>New Note</h1>
      </div>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}></NoteForm>
    </>
  );
}
