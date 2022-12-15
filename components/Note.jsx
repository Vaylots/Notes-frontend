import Image from "next/image";
import axios from "axios";
export default function Note({ id, title, success }) {
  function deleteNote(id) {
    axios.get(`http://127.0.0.1:8080/deletenote/${id}`);
    window.location.reload();
  }

  function succesNote(id) {
    axios.get(`http://127.0.0.1:8080/successnote/${id}`);

    window.location.reload();
  }
  const button = document.getElementById("test-button");

  return (
    <div>
      {!success ? (
        <div
          id={`note-${id}`}
          className="flex my-2 gap-2  rounded-xl py-3 text-white/80 bg-gray-600   w-full px-10  justify-between items-center"
        >
          <div>
            <p id="title">{title}</p>
          </div>
          <div className="flex gap-2">
            <div>
              <Image
                alt={"Check"}
                onClick={() => {
                  succesNote(id);
                }}
                className="cursor-pointer"
                src={"/checkcs.svg"}
                width={30}
                height={30}
              />
            </div>
            <div>
              <Image
                alt={"delete"}
                onClick={() => {
                  deleteNote(id);
                }}
                className="cursor-pointer"
                src={"/crossw.svg"}
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            id={`note-${id}`}
            className="flex my-2 gap-2  rounded-xl py-3 text-white/80 bg-gray-600   w-full px-10  justify-between items-center"
          >
            <div>
              <p id="title" className="line-through">
                {title}
              </p>
            </div>
            <div className="flex gap-2">
              <div>
                <Image
                  onClick={() => {
                    succesNote(id);
                  }}
                  alt={"Check"}
                  className="cursor-pointer"
                  src={"/checkcs.svg"}
                  width={30}
                  height={30}
                />
              </div>
              <div>
                <Image
                  onClick={() => {
                    deleteNote(id);
                  }}
                  alt={"delete"}
                  className="cursor-pointer"
                  src={"/crossw.svg"}
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
