# React + TypeScript + Vite

## Install
1. npm install
2. npm run dev

## Components
  App -> NoteList
       
       -> NoteNew -> NoteForm
      
       -> NoteLayout -> Note -> NoteEdit -> NoteForm
- `NoteList`: list all notes with tags attached
- `NoteNew`: control to input the create form for note
- `NoteForm`: Form to create/update note
- `NoteLayout`: control Note view, if note exists return Note component, otherwise go back to - NoteList
- `Note`: show content and tags of note
- `NoteEdit`: control to input edit form for note

## Functionalities

- In `NoteList`: search notes by title and tags, if title includes the searching return list of notes under the cards of notes.
    - `Create` button: opem `NoteForm` to create a note
    - `Edit Tags` button: open a modal to update or delete available tags, if tag is included in any notes, update/delete those notes
- In `NoteForm`: input title, tag and content to create/update note
    - `Tags` input: input the tags in hint or create a new one if it is not exist
    - `Save` button: save note
    - `Cancel` button: cancel and redirect to previous step
- In `Note`: choose note in NoteList to show `Note` details
    - `Edit` button: open `NoteForm` to update the exist note
    - `Delete` button: delete that note from `NoteList`
    - `Back` button: back to previous url/step
