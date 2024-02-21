import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { Note, NoteData, Tag } from "./App";
import {v4 as uuidV4} from "uuid"
import { useNavigate } from "react-router-dom";

export type NoteFormProps = {
  note?: Note
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[]
};

export function NoteForm({ note, onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(note ? note.tags : []);
  const navigate = useNavigate()

  function handleOnSubmit(event: FormEvent) {
    event.preventDefault()
    console.log("TAGS SELECT", selectedTags)
    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags
    })
    navigate("..")
  }

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={note ? note.title : ""}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableSelect
                  onCreateOption={label => {
                    const newTag = { id: uuidV4(), label: label}
                    onAddTag(newTag)
                    setSelectedTags(prev => [...prev, newTag])
                  }}
                  options={availableTags.map(tag => {return {label: tag.label, value: tag.id}})}
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control ref={markDownRef} required as="textarea" rows={15} defaultValue={note ? note.markdown : ""}/>
            </Form.Group>
          </Row>

          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button onClick={() => navigate("..")} type="button" variant="outline-primary">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
