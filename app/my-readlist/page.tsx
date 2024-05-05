"use client";

import { useSelector } from "react-redux";
import { selectBooks } from "@/app/lib/features/books/bookSlice";
import Container from "../components/container/Container";
import List from "../components/list/List";
import Card from "../components/card/Card";

export default function Page() {
  const books = useSelector(selectBooks);
  return (
    <Container size="100vw">
      <h1>Readlist books</h1>
      <List direction="row">
        {books.myReadList.map((b) => (
          <Card key={b.key} title={b.title} img={b.covers[0]}></Card>
        ))}
      </List>
    </Container>
  );
}
