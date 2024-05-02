import { fetchBooksBySubject } from "./lib/functions";
import Container from "./components/container/Container";
import List from "./components/list/List";
import Card from "./components/card/Card";
import { Subject } from "./lib/types";
import Link from "next/link";

const Home = async () => {
  const data_subject_romance: Subject = await fetchBooksBySubject("romance");
  const data_subject_scifi: Subject = await fetchBooksBySubject("scifi");
  const data_subject_drama: Subject = await fetchBooksBySubject("drama");

  const data: Subject[] = [
    data_subject_drama,
    data_subject_romance,
    data_subject_scifi,
  ];

  return (
    <Container size="100vw">
      <h1>Utforska biblioteket</h1>
      {data.map((x) => (
        <div key={x.key}>
          <h2>{x.name}</h2>
          <List key={x.key} direction="row">
            {x.works.map((w) => (
              <Link key={w.key} href={w.key}>
                <Card key={w.key} data={w}></Card>
              </Link>
            ))}
          </List>
        </div>
      ))}
    </Container>
  );
};

export default Home;
