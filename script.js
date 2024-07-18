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
        <span>${notes[index].title}</span>
        <button class="view-note" data-index="${i}">View Note</button>
        `;
    }

    let viewButton = document.querySelectorAll(".view-note");
    for(let i=0; i < notes.length; i++){
        viewButton[i].addEventListener("click", function(){
            openNoteModal(this.getAttribute('data-index'));
        });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
}

function openAddNoteModal(){
    newNoteTitle.value = '';
    newNoteText.value = '';
    addNoteModal.display.style = "block";
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

function editNote(index, newTextContent){

}

function deleteNote(index){

}



































