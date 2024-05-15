"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  removeBookFromFavourite,
  selectBooks,
} from "@/app/lib/features/books/bookSlice";
import List from "@/app/components/list/List";
import Container from "@/app/components/container/Container";
import Button from "@/app/components/button/Button";
import { AppDispatch } from "@/app/lib/features/store";
import {
  removeAuthor,
  selectAuthors,
} from "../lib/features/authors/authorSlice";
import style from "./favourite.module.scss";

export default function Page() {
  const books = useSelector(selectBooks);
  const authors = useSelector(selectAuthors);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container>
      <h1 className={style.title}>Fav books {books.favouriteBooks.length}</h1>

      {books.favouriteBooks.length != 0 ? (
        <>
          {books.favouriteBooks.map((b) => (
            <List space="between">
              <div className={style.row}>
                <img src={b.img_url} alt="cover" />
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.first_publish_date}</p>
                  <p>{b.number_of_pages}</p>
                </div>
              </div>
              <Button
                handleOnClick={() => dispatch(removeBookFromFavourite(b.key))}
                title="Remove"
                color="error"
              ></Button>
            </List>
          ))}
        </>
      ) : (
        <>
          <List space="between">
            <p>No favourites</p>
          </List>
        </>
      )}

      <h1 className={style.title}>Fav Authors {authors.length}</h1>
      {authors.length != 0 ? (
        <>
          {authors.map((a) => (
            <List space="between">
              <div className={style.row}>
                <img src={a.img_url} alt="cover" />
                <div>
                  <h2>{a.name}</h2>
                  <p>{a.fuller_name}</p>
                  <p>{a.birth_date}</p>
                </div>
              </div>
              <Button
                handleOnClick={() => dispatch(removeAuthor(a.key))}
                title="Remove"
              ></Button>
            </List>
          ))}
        </>
      ) : (
        <>
          <List space="between">
            <p>No favourites</p>
          </List>
        </>
      )}
    </Container>
  );
}
