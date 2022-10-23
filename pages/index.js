import axios from "axios";
import Head from "next/head";
import { useRef } from "react";
import Note from "../components/Note";
export default function Home({ notes }) {
  const noteTitleRef = useRef(null);

  function addNote() {
    const data = new FormData();
    data.append("Title", noteTitleRef.current.value);
    axios({
      method: "post",
      url: `http://127.0.0.1:8080/addnote/`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      window.location.reload();
    });
  }
  return (
    <div className="w-screen justify-center items-center flex flex-col h-screen bg-slate-700">
      <Head>
        <title>Notes</title>
      </Head>

      <main className=" border-4 border-black/80 p-2 text-xl shadow-lg flex flex-col justify-center items-center shadow-white/30 bg-white/90 w-1/3 h-4/6 rounded-lg">
        <header className="m-2 items-center flex flex-col">
          <p>Add Note</p>
          <div className="">
            <input
              ref={noteTitleRef}
              type="text"
              className="rounded-lg border border-black/50 mx-2 outline-none px-2"
            />
            <button
              onClick={() => {
                addNote();
              }}
              className="border border-black/70 px-2 rounded-3xl hover:bg-gray-600 hover:text-white"
            >
              Plus
            </button>
          </div>
        </header>
        <div className="w-full h-full mt-4">
          {notes.map((element) => {
            return (
              <Note
                id={element.id}
                title={element.title}
                success={element.success}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const response = await axios("http://localhost:8080/getallnotes");
  const notes = response.data;
  return {
    props: { notes }, // will be passed to the page component as props
  };
}
