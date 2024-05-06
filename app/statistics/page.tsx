"use client";

import { useSelector } from "react-redux";
import { selectBooks } from "@/app/lib/features/books/bookSlice";
import Container from "../components/container/Container";
import List from "../components/list/List";
import Card from "../components/card/Card";
import Button from "../components/button/Button";
import Modal from "../components/Modal/Modal";
import Form from "../components/form/Form";
import { useToggleModal } from "../lib/hooks/useToggleModal";
import { useState } from "react";
import "./statistics.scss";

export default function Page() {
  const [selectedBook, setSelectedBook] = useState<string>();
  const books = useSelector(selectBooks);
  const { open, toggle } = useToggleModal(false);
  function handleAddReview(key: string) {
    toggle();
    setSelectedBook(key);
  }
  return (
    <div className="statistics">
      <Container>
        <h1>Statistics</h1>

        <p>Number of books read: {books.myReadList.length}</p>
        <p>Total pages: </p>

        <h1>Finished books</h1>
        <List direction="row">
          {books.myReadList.map((b) => (
            <div className="list-item">
              <Card key={b.key} title={b.title} img={b.covers[0]} />
              <Button
                handleOnClick={() => handleAddReview(b.key)}
                title="Add review"
              />
            </div>
          ))}
        </List>
        {open && selectedBook ? (
          <Modal>
            <Form key={selectedBook} handleClose={() => toggle()}></Form>
          </Modal>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
}