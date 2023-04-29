import type { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { getXataClient } from "../utils/xata.codegen";
import xatafly from "../public/xatafly.gif";

const pushDummyData = async () => {
  const response = await fetch("/api/write-links-to-xata");

  if (response.ok) {
    window?.location.reload();
  }
};

const removeDummyItem = async (id: string) => {
  const { status } = await fetch("/api/clean-xata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (status === 200) {
    window?.location.reload();
  }
};

export default function IndexPage({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <header>
        <Image
          src={xatafly}
          alt={"Xata"}
          priority
        />
        <h1>
          Next.js with<span aria-hidden>&#8209;</span>xata
        </h1>
      </header>
      <article>
        {users.length ? (
          <ul>
            {users.map(({ id, credPubKey }) => (
              <li key={id}>
                <p>{credPubKey}</p>
              </li>
            ))}
          </ul>
        ) : (
          <section>
            <h2>No users found.</h2>
            <strong>
              Create a `nextjs_with_xata_example` and push some useful links to
              see them here.
            </strong>
            <button
              type="button"
              onClick={() => {
                pushDummyData();
              }}>
              Push records to Xata
            </button>
          </section>
        )}
      </article>
      <footer>
        <span>
          Made by{" "}
          <a
            href="https://xata.io"
            rel="noopener noreferrer"
            target="_blank">
            <object data="/xatafly.svg" />
          </a>
        </span>
      </footer>
    </main>
  );
}

export const getServerSideProps = async () => {
  const xata = await getXataClient();
  const users = await xata.db.users.getAll();
  return {
    props: {
      users,
    },
  };
};
