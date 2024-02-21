import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NoteNew } from "./NoteNew";
import { useLocalStorage } from "./storage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";
import { NoteEdit } from "./NoteEdit";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNote = {
  id: String;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onCreateTag(tag: Tag) {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((preNotes) => {
      return preNotes.filter((note) => {
        return note.id !== id;
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags((preTags) => {
      return preTags.filter((tag) => {
        return tag.id !== id;
      });
    });
  }

  function onUpdateTag(id: string, label: string) {
    setTags((preTags) => {
      return preTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route
            path="/"
            element={
              <NoteList
                availableTags={tags}
                notes={notesWithTags}
                onDeleteTag={onDeleteTag}
                onUpdateTag={onUpdateTag}
              />
            }
          />
          <Route
            path="/new"
            element={
              <NoteNew
                onSubmit={onCreateNote}
                onAddTag={onCreateTag}
                availableTags={tags}
              />
            }
          />
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <NoteEdit
                  onUpdate={onUpdateNote}
                  onAddTag={onCreateTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
