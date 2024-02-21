import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { useMemo, useState } from "react";
import styles from "./NoteList.module.css";

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, lable: string) => void
};

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdate: (id: string, lable: string) => void;
  onDelete: (id: string) => void;
};

export function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showEditTagsModal, setShowEditTagsModal] = useState(false)
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);


  return (
    <>
      <Row>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button onClick={() => {setShowEditTagsModal(true)}} variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col className="md-4">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Type new title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
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
      </Form>
      <Row className="align-item-center mb-4"></Row>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
      <EditTagsModal
        show={showEditTagsModal}
        handleClose={() => setShowEditTagsModal(false)}
        availableTags={availableTags}
        onDelete={onDeleteTag}
        onUpdate={onUpdateTag}
      />
    </>
  );
}

function EditTagsModal({
  availableTags,
  show,
  handleClose,
  onDelete,
  onUpdate,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      onChange={(e) => onUpdate(tag.id, e.target.value)}
                      type="text"
                      value={tag.label}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      onClick={() => onDelete(tag.id)}
                      variant="outline-danger"
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          <Stack
            gap={1}
            direction="horizontal"
            className="justify-content-center flex-wrap"
          >
            {tags.length > 0 &&
              tags.map((tag) => {
                return (
                  <Badge key={tag.id} className="text-truncate">
                    {tag.label}
                  </Badge>
                );
              })}
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
