export type Subject = {
  key: string;
  name: string;
  works: Work[];
};

type Work = {
  key: string;
  title: string;
  edition_count: number;
  cover_id: number;
  cover_edition_key: string;
};

export type Book = {
  authors: Author[];
  covers: number[];
  description: string | { type: string; value: string };
  first_publish_date: string;
  first_sentence: {
    type: string;
    value: string;
  };
  key: string;
  subjects: string[];
  title: string;
};

export type Author = {
  author: { key: string };
  type: { key: string };
};

export interface RootEntry {
  entries: Entry[];
}

export interface Entry {
  number_of_pages: number;
}

export type SearchResult = {
  docs: Doc[];
};

export type Doc = {
  author_name: string[];
  cover_i: number;
  edition_count: number;
  first_publish_year: number;
  key: string;
  title: string;
};

export type Review = {
  key: string;
  rating: string;
  text: string;
};
