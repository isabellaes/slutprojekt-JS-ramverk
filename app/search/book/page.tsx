import { fetchBookByTitle } from "@/app/lib/utils/api";
import { SearchResult } from "@/app/lib/utils/types";
import Link from "next/link";
import Container from "@/app/components/container/Container";
import PaginationBox from "@/app/components/pagination/Pagination";
import style from "../searchResult.module.scss";
import defaultImg from "../../images/No-Image-Placeholder.svg.png";
import List from "@/app/components/list/List";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page: string;
    query: string;
    subject: string;
  };
}) {
  const data: SearchResult = await fetchBookByTitle(
    searchParams.query,
    searchParams.page
  );

  return (
    <Container>
      <h1 className={style.title}>Search Page</h1>
      <p className={style.title}>Results: {data.numFound}</p>

      <div className={style.content}>
        {data?.docs.map((i) => (
          <Link key={i.key} href={`${i.key}`}>
            <List space="between">
              <div>
                {i.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${i.cover_i}-M.jpg`}
                    alt="cover"
                  />
                ) : (
                  <img src={defaultImg.src}></img>
                )}
                <p>{i.title}</p>
              </div>
            </List>
          </Link>
        ))}

        <PaginationBox
          total={data.numFound}
          page={Number(searchParams.page)}
          searchTerm={searchParams.query}
          pathName={searchParams.subject}
        />
      </div>
    </Container>
  );
}
