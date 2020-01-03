API_KEY = "d74a95e66dd36faf1b09aade6ca22213";

TOKEN = "69d3ab669b6271d81044daf08f934eabb54794deccf2d6a0cf6e9b255ea5301b";

const boardID = "5e09a649a64249754ec2c677";

let url;

const allCards = document.getElementById("my-board");
const checklist = document.getElementById("popup");

masterboard();

update();

// let headindex=0;
// let index=0;
let parent = "";

function masterboard() {
  url = `https://api.trello.com/1/boards/${boardID}?cards=all&key=${API_KEY}&token=${TOKEN}`;

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
      document.body.style.backgroundImage = `url(${data.prefs.backgroundImage})`;
      document.body.style.backgroundSize = "cover";
    });
  // .then(() => getboardcards())
  // .catch(error => {
  //   console.log(error);
  // });
}

function update() {
  url = `https://api.trello.com/1/boards/${boardID}/lists?cards=all&key=${API_KEY}&token=${TOKEN}`;

  return fetch(url, {
    method: "GET"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      getboardcards(data);
    });
}

function getboardcards(returnedData) {
  while (allCards.hasChildNodes()) {
    allCards.removeChild(allCards.firstChild);
  }

  for (let data of returnedData) {
    //   console.log(data)
    headCards(data);
  }
  const addHeadCardButton = document.createElement("button");
  addHeadCardButton.id = "items-list";
  addHeadCardButton.appendChild(document.createTextNode("+ Add New List"));
  allCards.appendChild(addHeadCardButton);
  addHeadCardButton.addEventListener("click", addListForm);
}

function headCards(items) {
  // console.log(items);
  const allCards = document.getElementById("my-board");
  const addHeadCardItem = document.createElement("div");
  addHeadCardItem.className = "head-card";
  addHeadCardItem.appendChild(document.createTextNode(items.name));
  // addHeadCardItem.setAttribute('position',headindex)
  addHeadCardItem.setAttribute("id", items.id);
  // index=0;
  for (let i = 0; i < items.cards.length; i++) {
    // (localData[headindex].items).push({id:items.cards[i].id,text:items.cards[i].name,position:i})
    const addCardItem = document.createElement("div");
    const text = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    addCardItem.className = "cards-list";
    // addCardItem.setAttribute('position',index++)
    addCardItem.setAttribute("id", items.cards[i].id);
    text.appendChild(document.createTextNode(items.cards[i].name));
    editButton.className = "edit-card";
    editButton.innerText = "\u270D";
    deleteButton.className = "delete-card";
    deleteButton.innerText = "\u2716";
    // console.log(items.cards[i])
    text.setAttribute("onclick", "popup()");
    editButton.addEventListener("click", putForm);
    deleteButton.addEventListener("click", deleteCard);

    addCardItem.appendChild(text);
    addCardItem.appendChild(editButton);
    addCardItem.appendChild(deleteButton);
    addHeadCardItem.appendChild(addCardItem);
  }
  const addCardButton = document.createElement("button");
  addCardButton.id = "add-card";
  addCardButton.className = "cards-list";
  addCardButton.appendChild(document.createTextNode("+ Add New card"));
  addCardButton.addEventListener("click", addForm);
  addHeadCardItem.appendChild(addCardButton);
  allCards.appendChild(addHeadCardItem);
}

// console.log(localData)

function putForm(obj) {
  const editFormLayout = obj.target.parentNode;
  const editTheForm = document.createElement("form");
  const editButton = document.getElementById("add-card");
  editButton.style.display = "none";
  const einputText = document.createElement("input");
  einputText.type = "text";
  einputText.placeholder = "Edit text";
  einputText.id = "edit-item";
  editTheForm.appendChild(einputText);
  editFormLayout.appendChild(editTheForm);
  editTheForm.addEventListener("submit", putCard);
}

function putCard(obj) {
  obj.preventDefault();
  // console.log('here')
  console.log(obj.target.parentNode.id);
  const theItem = document.getElementById("edit-item").value;
  // console.log(theItem);
  let LID = obj.target.parentNode.id;
  // console.log(LID);
  let ENAME = theItem;
  url = `https://api.trello.com/1/cards/${LID}?name=${ENAME}&key=${API_KEY}&token=${TOKEN}`;

  return fetch(url, {
    method: "PUT"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => update());
}

function deleteCard(obj) {
  // console.log(typeof obj.target.parentNode.id)
  let EID = obj.target.parentNode.id;
  url = `https://api.trello.com/1/cards/${EID}?key=${API_KEY}&token=${TOKEN}`;

  return fetch(url, {
    method: "DELETE"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => update());
}

function addForm(obj) {
  // console.log(obj.target.parentNode)
  const addFormLayout = obj.target.parentNode;
  const addTheForm = document.createElement("form");
  const addButton = document.getElementById("add-card");
  // addButton.appendChild(document.createTextNode('Add'));
  addButton.style.display = "none";
  const inputText = document.createElement("input");
  const inputButton = document.createElement("button");
  inputText.type = "text";
  inputText.placeholder = "Enter Card Name";
  inputText.id = "insert-item";
  addTheForm.appendChild(inputText);
  addTheForm.appendChild(inputButton);
  addFormLayout.appendChild(addTheForm);
  addTheForm.addEventListener("submit", addCard);
}

function addCard(obj) {
  // console.log('here')
  obj.preventDefault();
  const theItem = document.getElementById("insert-item").value;
  // console.log(theItem)
  let LID = obj.target.parentNode.id;
  LNAME = theItem;
  url = `https://api.trello.com/1/cards?idList=${LID}&name=${LNAME}&key=${API_KEY}&token=${TOKEN}`;

  return fetch(url, {
    method: "POST"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => update());
}

function addListForm(obj) {
  const addListFormLayout = obj.target.parentNode;
  const addListTheForm = document.createElement("form");
  // editButton.style.display= "none";
  const aListinputText = document.createElement("input");
  aListinputText.type = "text";
  aListinputText.placeholder = "Enter new list name";
  aListinputText.id = "add-list-item";
  addListTheForm.appendChild(aListinputText);
  addListFormLayout.appendChild(addListTheForm);
  addListTheForm.addEventListener("submit", addList);
}

function addList(obj) {
  obj.preventDefault();
  const theList = document.getElementById("add-list-item").value;
  let LID = theList;
  url = `https://api.trello.com/1/lists?name=${LID}&idBoard=${boardID}&pos=bottom&key=${API_KEY}&token=${TOKEN}`;
  // console.log(url)

  return fetch(url, {
    method: "POST"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => update());
}

function popup() {
  // console.log(event)
  const checklist = document.getElementById("popup");
  // console.log(checklist)
  // const checklistItems = document.getElementById("popup-content");
  parent = event.target.parentNode.id;
  checklist.style.display = "block";
  let CID = event.target.parentNode.id;
  // console.log(CID);
  url = `https://api.trello.com/1/cards/${CID}/checklists?&checkItem_fields=all&key=${API_KEY}&token=${TOKEN}`;

  return fetch(url, {
    method: "GET"
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      refreshCardDOM(data);
    });
}

function refreshCardDOM(data) {
  const tabCheckBoard = document.getElementById("popup-content");
  while (tabCheckBoard.hasChildNodes()) {
    tabCheckBoard.removeChild(tabCheckBoard.firstChild);
  }
  const checklistItems = document.createElement("div");
  // console.log(checklistItems);
  checklistItems.setAttribute("id", data[0].id);
  const closebutton = document.createElement("button");
  closebutton.innerText = "x";
  closebutton.className = "close";
  closebutton.addEventListener("click", close);

  for (let i = 0; i < data[0].checkItems.length; i++) {
    let status = data[0].checkItems[i].state;
    let checklistData = data[0].checkItems[i].name;
    // console.log(data[0].checkItems[i].id);

    const addListItem = document.createElement("div");
    const checkBox = document.createElement("input");
    const text = document.createElement("div");
    const editButton = document.createElement("button");
    const delButton = document.createElement("button");

    addListItem.className = "items-checklist";
    addListItem.setAttribute("id", data[0].checkItems[i].id);
    checkBox.className = "item-checkbox";
    checkBox.type = "checkbox";
    if (status === "incompelete") {
      checkBox.checked = 0;
    } else if (status === "complete") {
      checkBox.checked = 1;
    }

    text.appendChild(document.createTextNode(checklistData));
    editButton.className = "edit-card";
    editButton.innerText = "\u270D";
    delButton.className = "delete-item";
    delButton.innerText = "\u2716";
    delButton.addEventListener("click", delItem);
    editButton.addEventListener("click", editItemForm);

    if (status === "complete") {
      text.style.textDecoration = "line-through";
    } else if (status === "incomplete") {
      text.style.textDecoration = "none";
    }

    addListItem.appendChild(checkBox);
    addListItem.appendChild(text);
    addListItem.appendChild(editButton);
    addListItem.appendChild(delButton);
    checklistItems.appendChild(addListItem);
  }

  checklistItems.appendChild(closebutton);
  const addChecklistItem = document.createElement("button");
  addChecklistItem.className = "items-checklist";
  addChecklistItem.innerText = "+ Add new checklist item";
  checklistItems.appendChild(addChecklistItem);
  tabCheckBoard.appendChild(checklistItems);
  addChecklistItem.addEventListener("click", addItemForm);
}

function close() {
  // console.log(checklist)
  checklist.style.display = "none";
}

window.onclick = function(event) {
  // const checklist = document.getElementById("popup");
  if (event.target == checklist) {
    checklist.style.display = "none";
  }
};

function delItem(obj) {
  // console.log(obj.target.parentNode.parentNode.id)
  let CID = obj.target.parentNode.parentNode.id;
  let IID = obj.target.parentNode.id;
  url = `https://api.trello.com/1/checklists/${CID}/checkItems/${IID}?key=${API_KEY}&token=${TOKEN}`;
  // console.log(url)

  return fetch(url, {
    method: "DELETE"
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
  //   .then(() => getboardcards());
  // .then(() => popup());
}

function editItemForm(obj) {
  const editFormLayout = obj.target.parentNode;
  const editTheForm = document.createElement("form");
  const einputText = document.createElement("input");
  einputText.type = "text";
  einputText.placeholder = "Edit text";
  einputText.id = "edit-checklist-item";
  editTheForm.appendChild(einputText);
  editFormLayout.appendChild(editTheForm);
  editTheForm.addEventListener("submit", editItem);
}

function editItem(obj) {
  // console.log(obj)
  obj.preventDefault();
  // console.log('here')
  // console.log(obj.target.parentNode.id)
  const theItem = document.getElementById("edit-checklist-item").value;
  // console.log(theItem);
  let LID = obj.target.parentNode.id;
  const CID = parent;
  // console.log(LID);
  let ENAME = theItem;
  url = `https://api.trello.com/1/cards/${CID}/checkItem/${LID}?name=${ENAME}&key=${API_KEY}&token=${TOKEN}`;
  console.log(url);

  return fetch(url, {
    method: "PUT"
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
  //   .then(() => getboardcards());
}

function addItemForm(obj) {
  const addItemFormLayout = obj.target.parentNode;
  const addTheItem = document.createElement("form");
  const addItemInputText = document.createElement("input");
  addItemInputText.type = "text";
  addItemInputText.placeholder = "Add Item";
  addItemInputText.id = "add-checklist-item";
  addTheItem.appendChild(addItemInputText);
  addItemFormLayout.appendChild(addTheItem);
  addTheItem.addEventListener("submit", addItem);
}

function addItem(obj) {
  obj.preventDefault();
  // console.log(obj.target.parentNode.id)
  const CID = obj.target.parentNode.id;
  const CINAME = document.getElementById("add-checklist-item").value;
  url = `https://api.trello.com/1/checklists/${CID}/checkItems?name=${CINAME}&pos=bottom&checked=false&key=${API_KEY}&token=${TOKEN}`;
  return fetch(url, {
    method: "POST"
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
  //   .then(() => getboardcards());
}

// function strikeItem(obj) {
//   parent=obj.target.parentNode
//   const itemPosition=parent.attributes.position.value;
//   console.log(parent.firstChild.checked)
//   localData[itemPosition].status=parent.firstChild.checked;
// }
