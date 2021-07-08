"use strict";

const diaryInput = document.querySelector(".writing");
const titleInput = document.querySelector(".title");
const submitButton = document.querySelector(".dsubmit");
const indexList = document.querySelector(".womb");
const inputTime = document.querySelector(".clock");

const selectAll = document.querySelector(".select");
const unselectAll = document.querySelector(".unselect");
const deleteIndex = document.querySelector(".delete");

document.addEventListener("DOMContentLoaded", transferInformation);
submitButton.addEventListener("click", transferDiary);

selectAll.addEventListener("click", selectAllindex);
unselectAll.addEventListener("click", unselectAllindex);
deleteIndex.addEventListener("click", deleteDiaryIndex);

let layout_no = 0;
function transferDiary(e) {
  e.preventDefault();

  const indexLayout = document.createElement("div");
  indexLayout.classList.add("indexlayout");
  indexLayout.id = "indexlayout-" + layout_no;
  const diaryIndex = document.createElement("div");
  diaryIndex.classList.add("invisible");
  diaryIndex.innerText = diaryInput.value;

  const diaryTitle = document.createElement("div");
  diaryTitle.classList.add("index");

  const m = new Array(
    "JAN.",
    "FEB.",
    "MAR.",
    "APR.",
    "MAY",
    "JUN.",
    "JUL.",
    "AUG",
    "SEPT.",
    "OCT.",
    "NOV.",
    "DEC."
  );
  const years = date.getFullYear();
  const months = date.getMonth();
  const d = new Array(
    "Sun.",
    "Mon.",
    "Tues.",
    "wed.",
    "Thurs.",
    "Fri.",
    "Sat."
  );
  const days = date.getDay();
  const today = date.getDate();

  diaryTitle.innerHTML = `<input type='checkbox' name='indexchild' value='' class="indexchild" >${m[months]} ${today} ${years} ${d[days]} -${titleInput.value}</>`;

  const information = { note: diaryInput.value, title: titleInput.value };
  console.log(information);

  saveLocalInformation(information);

  indexLayout.appendChild(diaryTitle);
  diaryTitle.appendChild(diaryIndex);
  indexList.appendChild(indexLayout);

  const wayBackHome = document.getElementById("indexlayout-" + layout_no);

  wayBackHome.addEventListener("click", bringBackIndex);
  layout_no++;
}

function selectAllindex(e) {
  e.preventDefault();

  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (const cb of checkboxes) {
    cb.checked = true;
  }
}
function unselectAllindex(e) {
  e.preventDefault();
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (const cb of checkboxes) {
    cb.checked = false;
  }
}

function deleteDiaryIndex(i) {
  i.preventDefault();
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      removeDiv(checkboxes[i]);
      removeLocalInformation(checkboxes[i]);
    }
  }
}

function removeDiv(d) {
  console.log(d.parentElement.parentElement);
  console.log(d.parentElement.parentElement[1]);
  d.parentElement.parentElement.remove();
}

function bringBackIndex(e) {
  const bringEssence = e.target.getElementsByClassName("invisible");
  diaryInput.value = bringEssence[0].innerHTML.replace(
    /\s?(<br\s?\/?>)\s?/g,
    "\r\n"
  );
}

function saveLocalInformation(todo) {
  //check ---- HEy Do I already have thing in localstorage?
  let info;
  if (localStorage.getItem("info") === null) {
    info = [];
  } else {
    info = JSON.parse(localStorage.getItem("info"));
  }

  info.push(todo);
  localStorage.setItem("info", JSON.stringify(info));
}

function transferInformation() {
  //check ---- HEy Do I already have thing in localstorage?
  let info;
  if (localStorage.getItem("info") === null) {
    info = [];
  } else {
    info = JSON.parse(localStorage.getItem("info"));
  }

  info.forEach(function (e) {
    const indexLayout = document.createElement("div");
    indexLayout.classList.add("indexlayout");
    indexLayout.id = "indexlayout-" + layout_no;
    const diaryIndex = document.createElement("div");
    diaryIndex.classList.add("invisible");
    diaryIndex.innerText = e.note;

    const diaryTitle = document.createElement("div");
    diaryTitle.classList.add("index");

    const m = new Array(
      "JAN.",
      "FEB.",
      "MAR.",
      "APR.",
      "MAY",
      "JUN.",
      "JUL.",
      "AUG",
      "SEPT.",
      "OCT.",
      "NOV.",
      "DEC."
    );
    const years = date.getFullYear();
    const months = date.getMonth();
    const d = new Array(
      "Sun.",
      "Mon.",
      "Tues.",
      "wed.",
      "Thurs.",
      "Fri.",
      "Sat."
    );
    const days = date.getDay();
    const today = date.getDate();

    diaryTitle.innerHTML = `<input type='checkbox' name='indexchild' value='' class="indexchild" >${m[months]} ${today} ${years} ${d[days]} -${e.title}</>`;

    indexLayout.appendChild(diaryTitle);
    diaryTitle.appendChild(diaryIndex);
    indexList.appendChild(indexLayout);

    const wayBackHome = document.getElementById("indexlayout-" + layout_no);

    wayBackHome.addEventListener("click", bringBackIndex);
    layout_no++;
  });
}

function removeLocalInformation(todo) {
  let info;
  if (localStorage.getItem("info") === null) {
    info = [];
  } else {
    info = JSON.parse(localStorage.getItem("info"));
  }
  const todoIndex = todo.children.innerText;
  info.splice(info.indexOf(todoIndex), 1);
  localStorage.setItem("info", JSON.stringify(info));
}
