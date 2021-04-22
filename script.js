/**
 * The following program contains source code for an application that allows user to take quick notes using markdown syntax. The data is persistant
 * and will be stored in local browser storage. The data will continue to exist until user decided to clear the local storage data.
 * The application allows users to create new cards and type in data for taking quick notes. It allows users to create, update and delete those notes.
 */

//Reference to Add button
const addBtn = document.getElementById("add");
//Get notes from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

//Check if notes are present in local storage and populate UI accordingly
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

//Create and show new notes card when user clicks add button
addBtn.addEventListener("click", () => {
  addNewNote();
});

/**
 * @author Jeeva Kalaiselvam
 * @param {String} text Data to be added in new notes card
 */
function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  //Generate new HTML card based on content
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

  //Listens for user clicking edit button for editing note
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  //Listens for user clicking delete button for deleting note
  deteleBtn.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });

  //Listen for user input when typing and store the data in local storage alongside for it to be persistent later
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });

  document.body.append(note);
}

/**
 * @author Jeeva Kalaiselvam
 */
function updateLocalStorage() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  //Generate a array of notes data
  notesText.forEach((note) => {
    notes.push(note.value);
  });

  //Store the notes array data into local storage
  localStorage.setItem("notes", JSON.stringify(notes));
}
