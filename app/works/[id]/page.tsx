"use client";

import Container from "@/app/components/container/Container";
import "../workpage.scss";
import Button from "@/app/components/button/Button";
import { useParams } from "next/navigation";
import useFetchWork from "@/app/lib/hooks/useFetchWork";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/features/store";
import {
  addToFavouriteBook,
  addToReadList,
} from "@/app/lib/features/books/bookSlice";
import { Book, ReadBook, FavBook } from "@/app/lib/utils/types";
import defalaultImg from "../../images/No-Image-Placeholder.svg.png";

export default function Page() {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { book, pages } = useFetchWork(params.id);

  function handleAddToReadList(book: Book) {
    let photosrc;
    if (book.covers != undefined) {
      photosrc = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`;
    } else {
      photosrc = defalaultImg.src;
    }
    const bookToAdd: ReadBook = {
      key: book.key,
      rating: "",
      comment: "",
      title: book.title,
      cover: photosrc,
      number_of_pages: pages || 199,
    };

    dispatch(addToReadList(bookToAdd));
  }

  function handleAddToFavourite(book: Book) {
    let photosrc;
    if (book.covers != undefined) {
      photosrc = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`;
    } else {
      photosrc = defalaultImg.src;
    }

    const favBook: FavBook = {
      authors: book.authors,
      cover: photosrc,
      description: book.description,
      first_publish_date: book.first_publish_date,
      first_sentence: book.first_sentence,
      key: book.key,
      subjects: book.subjects,
      title: book.title,
      number_of_pages: pages,
    };

    dispatch(addToFavouriteBook(favBook));
  }

  if (!book) return <div>Loading...</div>;

  return (
    <div className="work-page">
      <Container>
        <div className="row">
          <div className="item">
            {book.covers ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                alt="cover"
              />
            ) : (
              <img src={defalaultImg.src}></img>
            )}
            <div className="buttons">
              {" "}
              <Button
                handleOnClick={() => handleAddToFavourite(book)}
                title="Add to favourite"
              />
              <Button
                handleOnClick={() => handleAddToReadList(book)}
                title="Mark as finished"
              />
            </div>
          </div>

          <div className="item">
            <h1>{book.title}</h1>
            <p className="description">
              <span className="bold">Description: </span>
              {book.description ? (
                <>
                  {typeof book.description === "string" ? (
                    <>{book.description}</>
                  ) : (
                    <>{book.description.value}</>
                  )}
                </>
              ) : (
                ""
              )}
            </p>

            <p>
              <span className="bold">Published: </span>{" "}
              {book.first_publish_date}
            </p>
            <p>
              <span className="bold">First sentence:</span>
              {book.first_sentence?.value}
            </p>
            <p>Pages: {pages != 0 ? `${pages}` : "199"}</p>

            <p>
              <span className="bold">Subjects:</span> {book.subjects}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
