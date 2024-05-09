"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBookByTitle } from "@/app/lib/utils/api";
import { SearchResult } from "@/app/lib/utils/types";
import Link from "next/link";
import Container from "@/app/components/container/Container";

export default function Page() {
  const [data, setData] = useState<SearchResult>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const data: SearchResult = await fetchBookByTitle(params.id);
      setData(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <Container>
      <h1>Search Page</h1>
      {data ? (
        <>
          <p>Results: {data.numFound}</p>
          {data.docs.map((s) => (
            <Link href={`${s.key}`}>
              <p>{s.title}</p>
            </Link>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}
