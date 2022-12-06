"use strict"

const addNoteBtn = document.getElementById("addNoteBtn")
const noteArea = document.querySelector(".container")

addNoteBtn.addEventListener("click", () => createNote())
showSavedNotes()

function createNote(savedNoteId, savedNoteValue){
    let noteId = (savedNoteId === undefined) ? Math.floor(Math.random()*10000000) : savedNoteId
    let note = document.createElement("div")
    let noteTextArea = document.createElement("textarea")
    let buttonsDiv = document.createElement("div")
    let deleteNoteBtn = document.createElement("button")
    let saveNoteBtn = document.createElement("button")
    console.log(noteId)
    
    note.setAttribute("class", "note")
    note.setAttribute("id", noteId)
    noteTextArea.setAttribute("placeholder","Create here your note")
    if(savedNoteValue != undefined) noteTextArea.value = savedNoteValue

    deleteNoteBtn.innerHTML = "Remove Note"
    deleteNoteBtn.addEventListener("click", () => removeNote(noteId))

    saveNoteBtn.innerHTML = "Save Note"
    saveNoteBtn.addEventListener("click", () => saveNote(noteId))
    
    buttonsDiv.append(saveNoteBtn)
    buttonsDiv.append(deleteNoteBtn)
    
    note.append(noteTextArea)
    note.append(buttonsDiv)
    
    noteArea.append(note)
}

function removeNote(noteId){
    let noteToDelete = document.getElementById(noteId)
    noteToDelete.remove()
    delete localStorage[noteId]
}

function saveNote(noteId){
    let noteValue = document.getElementById(noteId).querySelector("textarea")
    noteValue = noteValue.value
    localStorage[noteId] = noteValue
    alert("Note saved")
}

function showSavedNotes(){
    for(let i=0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        let item = localStorage.getItem(key)
        console.log(key, item)
        createNote(key, item)
    }
}