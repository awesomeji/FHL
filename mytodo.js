"use strict";
//selectors
const clockSpan = document.getElementsByClassName("clock");
const todoInput = document.querySelector(".todoinput");
const todoButton = document.querySelector(".inputicon");
const todoList = document.querySelector(".todolist");
const todoBody = document.querySelector(".todobody");
const filterOption = document.querySelector(".todofilter");

//EventListeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);
filterOption.addEventListener("change", filterTodo);
function getTime() {
  const years = date.getFullYear();
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
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const time = ` ${m[months]} ${today} ${years} ${d[days]} ${
    hours < 10 ? `0${hours}` : hours
  } : ${minutes < 10 ? `0${minutes}` : minutes}`;

  for (var i = 0; i < clockSpan.length; i++) {
    clockSpan[i].innerText = `${time}`;
  }
}
console.log(clockSpan.length);
console.log(clockSpan);
//여기 꼭 for를 써야되나? 왜 이렇게 짠걸까
//, 헤더에 드랍다운추가
// clockSpan[0].innerText = `${time}`;
//이래도되는데

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();

console.log(date);

//setinterval
//https://offbyone.tistory.com/241

function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const justifyDiv = document.createElement("div");
  justifyDiv.classList.add("buttons");

  todoDiv.appendChild(justifyDiv);

  const completedButton = document.createElement("button");
  completedButton.innerHTML =
    '<img class="check-btn" src="./calendar-check-regular.svg" alt="">';

  completedButton.classList.add("complete-btn");

  justifyDiv.appendChild(completedButton);

  const deletedButton = document.createElement("button");
  deletedButton.innerHTML =
    '<img class="dumpster-btn"  src="./dumpster-fire-solid.svg" alt="">';

  deletedButton.classList.add("delete-btn");

  justifyDiv.appendChild(deletedButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deletecheck(e) {
  console.log(e.target);
  const item = e.target;
  if (item.classList[0] === "dumpster-btn") {
    const todo = item.parentElement.parentElement.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    //이벤트리스너 별별게 다있네
  }
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement.parentElement.parentElement;
    todo.classList.toggle("completed");
  }
}
//작성 내용을 로컬스토리지에 저장 컴플리트로계층화 삭제기능추가 Eventlistner 종류
//e.target을 ul 태그에 클릭으로 걸어줬는데
//ul의 요소를 클릭할때마다 그 요소을 불러오는(여기선 콘솔로그에 기록)내용

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (t) {
    switch (e.target.value) {
      case "all":
        t.style.display = "flex";
        break;
      case "completed":
        if (t.classList.contains("completed")) {
          t.style.display = "flex";
        } else {
          t.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!t.classList.contains("completed")) {
          t.style.display = "flex";
        } else {
          t.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check ---- HEy Do I already have thing in localstorage?
  let tod;
  if (localStorage.getItem("tod") === null) {
    tod = [];
  } else {
    tod = JSON.parse(localStorage.getItem("tod"));
  }

  tod.push(todo);
  localStorage.setItem("tod", JSON.stringify(tod));

}
//투두를 생성하면(appendchild(tododiv)) 인풋내용에 대하여 saveLocalstorage라는 함수를 실행하는데

//우선 로컬스토리지에 아이템이 있는지 확인 없으면 빈 배열을 하나 만들어준다.
//있으면 겟아이템으로 아이템들을 가져와 파싱(배열로 다시만들어줌)한다.
//그리고 그배열에 인풋내용을 추가하고 다시 제이슨으로 스트링파이해서 로컬스토리지에 저장해준다.


//로컬스토리지에 저장은되는데 새로고침하니까 안보이네?  어케이걸 보이게하지?
//아 겟투두라는 이걸 만드는걸 투두를 만드는 함수를 만들고 그걸 돔에 이벤트 리스너를추가해서
// 돔이 실행될떄마다(예를들어 새로고침) 다시만들게하자
function getTodos() {

  let tod;
  if (localStorage.getItem("tod") === null) {
    tod = [];
  } else {
    tod = JSON.parse(localStorage.getItem("tod"));
  }
  tod.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const justifyDiv = document.createElement("div");
    justifyDiv.classList.add("buttons");

    todoDiv.appendChild(justifyDiv);

    const completedButton = document.createElement("button");
    completedButton.innerHTML =
      '<img class="check-btn" src="./calendar-check-regular.svg" alt="">';

    completedButton.classList.add("complete-btn");

    justifyDiv.appendChild(completedButton);

    const deletedButton = document.createElement("button");
    deletedButton.innerHTML =
      '<img class="dumpster-btn"  src="./dumpster-fire-solid.svg" alt="">';

    deletedButton.classList.add("delete-btn");

    justifyDiv.appendChild(deletedButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  });
}

function removeLocalTodos(todo) {
  let tod;
  if (localStorage.getItem("tod") === null) {
    tod = [];
  } else {
    tod = JSON.parse(localStorage.getItem("tod"));
  }
  const todoIndex = todo.children[0].innerText;
  tod.splice(tod.indexOf(todoIndex), 1);
  localStorage.setItem("tod", JSON.stringify(tod));
}


