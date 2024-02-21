import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight'

type NoteProps = {
  onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate()
  
  function onHandleDelete(event: any) {
    event.preventDefault()
    onDelete(note.id)
    navigate("..")
  }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.length > 0 &&
                note.tags.map((tag) => {
                  return (
                    <Badge key={tag.id} className="text-truncate">
                      {tag.label}
                    </Badge>
                  );
                })}
            </Stack>
          )}
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Link to={`/${note.id}/edit`}>
              <Button type="submit" variant="primary">
                Edit
              </Button>
            </Link>
            <Button type="button" variant="outline-danger" onClick={onHandleDelete}>
              Delete
            </Button>
            <Link to="/">
              <Button type="button" variant="outline-secondary">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Markdown rehypePlugins={[rehypeHighlight]}>{note.markdown}</Markdown>
    
    </>
  );
}
