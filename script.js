let addNoteBtn = document.querySelector(".add-note");
let notesList = document.querySelector(".existing-notes");

let noteModal = document.querySelector(".note-modal");
let modalTitle = document.getElementById("modal-title");
let modalText = document.getElementById("modal-text");

let editBtn = document.querySelector(".edit-note");
let deleteBtn = document.querySelector(".delete-note");
let closeButtons = document.querySelectorAll(".close");

let addNoteModal = document.querySelector(".add-note-modal");
let newNoteTitle = document.getElementById("newNoteTitle");
let newNoteText = document.getElementById("newNoteText");
let saveNoteBtn = document.querySelector(".save-note");

let editMode = false;
let currentEditIndex = -1;

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function displayNotes(){
    notesList.innerHTML = '';
    for(let i=0; i < notes.length; i++){
        let noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
        <span class="note-title">${notes[i].title}</span>
        <button class="view-note" data-index="${i}">View Note</button>
        `;
        notesList.appendChild(noteItem);
    }

    let viewButtons = document.querySelectorAll(".view-note");

    for(let i=0; i < viewButtons.length; i++){
        viewButtons[i].addEventListener("click", function(){
            openNoteModal(this.getAttribute('data-index'));
        });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
}

function openAddNoteModal(event){
    event.preventDefault();  
    newNoteTitle.value = '';
    newNoteText.value = '';
    addNoteModal.style.display = "block";
}

function saveNewNote(event){
    event.preventDefault();  // Prevent form submission
    let title = newNoteTitle.value.trim();
    let text = newNoteText.value.trim();
    if(title && text){
        notes.push({ title, text });
        displayNotes();
        closeModal(addNoteModal);
    }
    else {
        alert('Please enter both title and content for the note!');
    }
}

function deleteNote(index){
    notes.splice(index, 1);
    displayNotes();
    closeModal(noteModal);
}

function openNoteModal(index){
    currentEditIndex = parseInt(index);
    modalTitle.textContent = notes[currentEditIndex].title;
    modalText.value = notes[currentEditIndex].text;
    modalText.readOnly = true;
    noteModal.style.display = "block";
    editMode = false;

    editBtn.textContent = "Edit";
    editBtn.onclick = toggleEditMode;
    deleteBtn.onclick = function() { deleteNote(currentEditIndex); };
}

function toggleEditMode(){
    if(editMode){
        notes[currentEditIndex].text = modalText.value;
        displayNotes();
        modalText.readOnly = true;
        editBtn.textContent = "Edit";
        editMode = false;
        closeModal(noteModal);
    }
    else {
        modalText.readOnly = false;
        editBtn.textContent = "Save";
        editMode = true;
    }
}

function closeModal(modal){
    modal.style.display = "none";
    if(modal === noteModal){
        editMode = false;
        editBtn.textContent = "Edit";
        currentEditIndex = -1;
    } else if(modal === addNoteModal) {
        newNoteTitle.value = '';
        newNoteText.value = '';
    }
}

addNoteBtn.addEventListener("click", openAddNoteModal);
saveNoteBtn.addEventListener("click", saveNewNote);

// Event listeners for close buttons
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        let modal = this.closest('.note-modal') || this.closest('.add-note-modal');
        if (modal) {
            closeModal(modal);
        }
    });
});

window.addEventListener("click", function(event){
    if(event.target == noteModal){
        closeModal(noteModal);
    }
    else if(event.target == addNoteModal){
        closeModal(addNoteModal);
    }
});

displayNotes();