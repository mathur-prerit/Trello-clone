// require('dotenv').config()
// const fetch = require('node-fetch')

API_KEY = "";

TOKEN = "";

let localData = JSON.parse(localStorage.getItem("items"));

if(localData===null){
  localData=[]
  localStorage.setItem("items", JSON.stringify(localData));
}


let url;

const allbody = document.getElementById("allbody");
const allCards = document.createElement("div");
allCards.className = "my-board";
allbody.appendChild(allCards);

masterboard()

let headindex=0;
let index=0;

function masterboard() {
  url = `https://api.trello.com/1/boards/W7RvPJMy?cards=all&key=${API_KEY}&token=${TOKEN}`;

  return fetch(url, {
    method: "GET"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      document.body.style.backgroundImage = `url(${data.prefs.backgroundImage})`;
      document.body.style.backgroundSize = "cover";
    })
    .then(() => getboardcards())
    .catch((error) => {
      console.log(error);
    });
}

function getboardcards() {
  url = `https://api.trello.com/1/boards/W7RvPJMy/lists?cards=all&key=${API_KEY}&token=${TOKEN}`;

  return fetch(url, {
    method: "GET"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      // console.log(data)
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i])
        localData.push({id:data[i].id,text:data[i].name,position:i,items:[]})
        headCards(data[i]);
      }
      const addHeadCardButton =document.createElement('button')
      addHeadCardButton.appendChild(document.createTextNode('+ Add New List'))
      allCards.appendChild(addHeadCardButton)
    });
}

function headCards(items) {
  // console.log(items);
  const addHeadCardItem = document.createElement("div");
  addHeadCardItem.className = "head-card";
  addHeadCardItem.appendChild(document.createTextNode(items.name));
  addHeadCardItem.setAttribute('position',headindex)
  addHeadCardItem.setAttribute('id',items.id)
  index=0;
  for (let i = 0; i < items.cards.length; i++) {
    (localData[headindex].items).push({id:items.cards[i].id,text:items.cards[i].name,position:i})
    const addCardItem = document.createElement("div");
    const text = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
    addCardItem.className = "cards-list";
    addCardItem.setAttribute('position',index++)
    addCardItem.setAttribute('id',items.cards[i].id)
    text.appendChild(document.createTextNode(items.cards[i].name));
    editButton.className = "edit-card";
    editButton.innerText = "\u270D";
    deleteButton.className = "delete-card";
    deleteButton.innerText = "\u2716";
    // console.log(items.cards[i])
    editButton.addEventListener("click",putCard)
    deleteButton.addEventListener("click",deleteCard)

    addCardItem.appendChild(text);
    addCardItem.appendChild(editButton);
    addCardItem.appendChild(deleteButton);
    addHeadCardItem.appendChild(addCardItem);
  }
  const addCardButton =document.createElement('button')
  addCardButton.id="add-card";
  addCardButton.appendChild(document.createTextNode('+ Add New card'))
  addCardButton.addEventListener("click",addForm)
  addHeadCardItem.appendChild(addCardButton)
  allCards.appendChild(addHeadCardItem);
  headindex=headindex+1
}

// console.log(localData)


function putCard(obj){
  // console.log(obj.target.parentNode.id)
  let LID=obj.target.parentNode.id
  let ENAME= "mathur"
  url = `https://api.trello.com/1/cards/${LID}?name=${ENAME}&key=${API_KEY}&token=${TOKEN}`

  return fetch(url, {
    method: "PUT"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => getboardcards());
}


function deleteCard(obj){
  // console.log(typeof obj.target.parentNode.id)
  let EID=obj.target.parentNode.id
  url = `https://api.trello.com/1/cards/${EID}?key=${API_KEY}&token=${TOKEN}`

  return fetch(url, {
    method: "DELETE"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => getboardcards());
}

function addForm(obj) {
  const addFormLayout  = obj.target.parentNode;
  const addButton = document.getElementById("add-card");
  addButton.style.display= "none";
  const inputText = document.createElement("input");
  const inputButton = document.createElement("button")
  inputText.type = "text";
  inputText.placeholder = "Enter Card Name"
  inputText.id="insert-item"
  addFormLayout.appendChild(inputText);
  addFormLayout.appendChild(inputButton)
  addFormLayout.addEventListener("submit",addCard)
}

function addCard(obj){
  console.log('here')
  // obj.preventDefault();
  const theItem = document.getElementById("insert-item").value;
  console.log(theItem)
  let LID=obj.target.parentNode.id
  LNAME= "prerit"
  url = `https://api.trello.com/1/cards?idList=${LID}&name=${LNAME}&key=${API_KEY}&token=${TOKEN}`

  return fetch(url, {
    method: "POST"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => getboardcards());
}

