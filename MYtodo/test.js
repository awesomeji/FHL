const selectAll = document.querySelector(".select");
const unselectAll = document.querySelector(".unselect");
const deleteIndex = document.querySelector(".delete");
const randomTitle = document.querySelector(".title");
document.addEventListener("DOMContentLoaded", transferDiarys);
selectAll.addEventListener("click", selectAllindex);
unselectAll.addEventListener("click", unselectAllindex);
deleteIndex.addEventListener("click", deleteDiaryIndex);

function selectAllindex(event) {
  event.preventDefault();
  if (testform.checkboxchild.length !== undefined) {
    for (let i = 0; i < testform.checkboxchild.length; i++) {
      testform.checkboxchild[i].checked = true;
    }
  } else {
    testform.checkboxchild.checked = true;
  }
}
function unselectAllindex(i) {
  i.preventDefault();
  if (testform.checkboxchild.length !== undefined) {
    for (let i = 0; i < testform.checkboxchild.length; i++) {
      testform.checkboxchild[i].checked = false;
    }
  } else {
    testform.checkboxchild.checked = false;
  }
}

function deleteDiaryIndex(i) {
  i.preventDefault();
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      removeDiv(checkboxes[i]);
      removeSaveLocal(checkboxes[i]);
      removeSaveLocalTitle(checkboxes[i]);
    }
  }
}

function removeDiv(d) {
  console.log(d.parentElement.parentElement);
  d.parentElement.parentElement.remove();
}

const transferButton = document.querySelector(".transfer");
const textArea = document.querySelector(".textarea");
const indexList = document.querySelector(".indexlist");

transferButton.addEventListener("click", transferDiary);
var layout_no = 0;
function transferDiary(e) {
  e.preventDefault();
  const indexLayout = document.createElement("div");
  indexLayout.classList.add("indexlayout");
  indexLayout.id = "indexlayout-" + layout_no;

  const trashA = document.createElement("div");
  trashA.classList.add("trasha");
  trashA.innerText = randomTitle.value;
  const essence = document.createElement("div");
  essence.classList.add("essence");
  essence.innerText = textArea.value;

  saveToLocal(textArea.value);
  saveTitleToLocal(randomTitle.value);

  indexLayout.appendChild(trashA);
  trashA.appendChild(essence);
  indexList.appendChild(indexLayout);

  const indexToButton = document.getElementById("indexlayout-" + layout_no);
  indexToButton.addEventListener("click", bringBackNote);
  layout_no++;
}
function bringBackNote(e) {
  e.preventDefault();
  const bringEssence = e.target.getElementsByClassName("essence");
  textArea.value = bringEssence[0].innerHTML.replace(
    /\s?(<br\s?\/?>)\s?/g,
    "\r\n"
  );
}

function saveToLocal(todo) {
  //check ---- HEy Do I already have thing in localstorage?
  let es;
  if (localStorage.getItem("es") === null) {
    es = [];
  } else {
    es = JSON.parse(localStorage.getItem("es"));
  }

  es.push(todo);
  localStorage.setItem("es", JSON.stringify(es));
}

function saveTitleToLocal(todo) {
  //check ---- HEy Do I already have thing in localstorage?
  let title;
  if (localStorage.getItem("title") === null) {
    title = [];
  } else {
    title = JSON.parse(localStorage.getItem("title"));
  }

  title.push(todo);
  localStorage.setItem("title", JSON.stringify(title));
}


function transferDiarys() {
  let es;
  if (localStorage.getItem("es") === null) {
    es = [];
  } else {
    es = JSON.parse(localStorage.getItem("es"));
  }

  es.forEach(function(e){ 
    
    let title;
    if (localStorage.getItem("title") === null) {
      title = [];
    } else {
      title = JSON.parse(localStorage.getItem("title"));
    }
    
  const indexLayout = document.createElement("div");
  indexLayout.classList.add("indexlayout");
  indexLayout.id = "indexlayout-" + layout_no;

  const trashA = document.createElement("div");
  trashA.classList.add("trasha");
  trashA.innerText = `${title}`;
  const essence = document.createElement("div");
  essence.classList.add("essence");
  essence.innerText = e;


  indexLayout.appendChild(trashA);
  trashA.appendChild(essence);
  indexList.appendChild(indexLayout);

  const indexToButton = document.getElementById("indexlayout-" + layout_no);
  indexToButton.addEventListener("click", bringBackNote);
  layout_no++;

  })

}



function removeSaveLocal(todo) {
  let es;
  if (localStorage.getItem("es") === null) {
    es = [];
  } else {
    es = JSON.parse(localStorage.getItem("es"));
  }
  const todoIndex = todo.children.innerText;
  es.splice(es.indexOf(todoIndex), 1);
  localStorage.setItem("es", JSON.stringify(es));
}

function removeLocalDiary(todo) {
  let title;
  if (localStorage.getItem("title") === null) {
    title = [];
  } else {
    title = JSON.parse(localStorage.getItem("title"));
  }
  const todoIndex = todo.children.innerText;
  title.splice(title.indexOf(todoIndex), 1);
  localStorage.setItem("title", JSON.stringify(title));
}
