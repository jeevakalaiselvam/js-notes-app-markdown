const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="notes">
        <div class="tools">
            <button class="edit"><i class="fas ${
              text ? "fa-edit" : "fa-check"
            }"></i></button>
            <button class="delete"><i class="fas fa-trash"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}">
        </div>
        <textarea placeholder="Enter your markdown here..." class="${
          text ? "hidden" : ""
        }"></textarea>
    </div>
  `;

  const notesEl = note.querySelector(".notes");
  const editBtn = note.querySelector(".edit");
  const editBtnI = note.querySelector(".edit i");
  const deteleBtn = note.querySelector(".delete");
  const main = notesEl.querySelector(".main");
  const textArea = notesEl.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deteleBtn.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });

  document.body.append(note);
}

function updateLocalStorage() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
