'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtimedatabase-250b1-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsmentsEl = document.getElementById("endorsments-el")

publishBtn.addEventListener("click", ()=>{
    let newEndorsment = inputEl.value
    push(endorsementsInDB, newEndorsment)
    renderEndorsements(newEndorsment)
    clearInput()
})

onValue(endorsementsInDB, (snapshot)=>{
    let endorsmentArray = Object.entries(snapshot.val())
    clearEndorsmentsEl()

    for(let i =0; i < endorsmentArray.length; i++){
        let currentEndorsment = endorsmentArray[i]
        renderEndorsements(currentEndorsment)
    }
})


const clearEndorsmentsEl=()=> {
    endorsmentsEl.innerHTML = ""
}

// clear Inputfield
const clearInput = () =>{
    inputEl.value = ""
}

// render Endorsements
const renderEndorsements = (endorsment)=>{
    let endorsmentID = endorsment[0]
    let endorsmentValue = endorsment[1]



    let newListItem = document.createElement("li")
    newListItem.textContent = endorsmentValue
    newListItem.addEventListener("click", () => {
        let idOfEndorsmentinDB = ref(database, `endorsements/${endorsmentID}`)
        
        remove(idOfEndorsmentinDB)
    })
    endorsmentsEl.append(newListItem)
}


