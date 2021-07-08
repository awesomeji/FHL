"use strict";

let date = new Date();
//나중에 재정의 해줘야되서 렛으로 바꿈

const renderCalender = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  const prevLastexperiment = new Date(2021, 6, 0);
  console.log(prevLastexperiment);

  const prevLast = new Date(viewYear, viewMonth, 0);
  console.log(prevLast);

  const thisLast = new Date(viewYear, viewMonth + 1, 0);
  console.log(thisLast);

  const PLDate = prevLast.getDate();
  console.log(PLDate);
  const PLDay = prevLast.getDay();
  console.log(PLDay);

  const TLDate = thisLast.getDate();
  console.log(TLDate);
  const TLDay = thisLast.getDay();

  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];
  console.log(thisDates);

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i <= 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const primdates = prevDates.concat(thisDates, nextDates);
  console.log(primdates);

  const dates = primdates.slice(0, 35);
  console.log(dates);
  const firstDateIndex = dates.indexOf(1);
  console.log(firstDateIndex);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  console.log(lastDateIndex);
  console.log(dates);
  dates.forEach((date, i) => {
   
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    dates[
      i
    ] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });

  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let d of document.querySelectorAll(".this")) {
      if (+d.innerText === today.getDate()) {
        d.classList.add("today");
        break;
      }
    }
  }
};

//let of , 다항연산자, 가상클래스, 헤더에 드랍다운추가 엘리배열강의
//let of 라는건 없고 for of 의 한방법이구나
// for (let parameter(something의 요소들) of something)
// 배열의요소 of 배열A
// elements of div.A
renderCalender();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};
const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};
const goToday = () => {
  date = new Date();
  renderCalender();
};
//왜 선언해야하는지 이해가 안가는 군
const prevButton = document.getElementsByClassName("nav-btn go-prev");
const todayButton = document.getElementsByClassName("nav-btn go-today");
const nextButton = document.getElementsByClassName("nav-btn go-next");

// https://stackoverflow.com/questions/32027935/addeventlistener-is-not-a-function-why-does-this-error-occur
// getElementbyClassName returns an array of elements. so you have to target specific index of item like below
prevButton[0].addEventListener("click", prevMonth, false);
todayButton[0].addEventListener("click", goToday, false);
nextButton[0].addEventListener("click", nextMonth, false);

//단항연산자
