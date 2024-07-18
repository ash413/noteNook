let addNoteBtn = document.querySelector(".add-note");
let notesList = document.querySelector(".existing-notes");

let noteModal = document.querySelector(".note-modal");
let modalTitle = document.getElementById("modal-title");
let modalText = document.getElementById("modal-text");

let editBtn = document.querySelector(".edit-note");
let deleteBtn = document.querySelector(".delete-note");
let closeNoteBtn = document.querySelectorAll(".close");

let addNoteModal = document.querySelector(".add-note-modal");
let newNoteTitle = document.getElementById("newNoteTitle");
let newNoteText = document.getElementById("newNoteText");
let saveNoteBtn = document.querySelector(".save-note");

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function displayNotes(){
    notesList.innerHTML = '';
    for(let i=0; i < notes.length; i++){
        let noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
        <span>${notes[i].title}</span>
        <button class="view-note" data-index="${i}">View Note</button>
        `;
        notesList.appendChild(noteItem);
    }

    let viewButtons = document.querySelectorAll(".view-note");

    for(let i=0; i < notes.length; i++){
        viewButtons[i].addEventListener("click", function(){
            openNoteModal(this.getAttribute('data-index'));
        });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
}

function openAddNoteModal(){
    newNoteTitle.value = '';
    newNoteText.value = '';
    addNoteModal.style.display = "block";
}

function saveNewNote(){
    let title = newNoteTitle.value.trim();
    let text = newNoteText.value.trim();
    if(title && text){
        notes.push({ title,text });
        displayNotes();
        closeModal(addNoteModal);
    }
    else {
        alert('Please enter both title and content for the node!');
    }
}

function editNote(index){
    notes[index].content = modalText.value;
    displayNotes();
    closeModal(noteModal);
}

function deleteNote(index){
    notes.splice(index, 1);
    displayNotes();
    closeModal(noteModal);
}

function openNoteModal(index){
    modalTitle.textContent = notes[index].title;
    modalText.value = notes[index].text;
    modalText.style.display = "block";

    editBtn.onclick = function() { editNote(index); };
    deleteBtn.onclick = function() { deleteNote(index); };
}

function closeModal(modal){
    modalText.style.display = "none";
}

addNoteBtn.addEventListener("click", openAddNoteModal);
saveNoteBtn.addEventListener("click", saveNewNote);
for(let i=0; i < notes.length; i++){
    closeNoteBtn[i].addEventListener("click", function(){
        closeModal(this.closest('.modal'));
    });
}
window.addEventListener("click", function(event){
    if(event.target == noteModal){
        closeModal(noteModal);
    }
    else if(event.target == addNoteModal){
        closeModal(addNoteModal);
    }
});

displayNotes();