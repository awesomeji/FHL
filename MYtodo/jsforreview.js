"use strict";
//오늘 날짜 가져오기 (기준)
const date = new Date();

//연 월 가져오기
const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

const prevLastexperiment = new Date(2021, 6, 0);
console.log(prevLastexperiment);
//이렇게 뉴데이트 연 월 적고 마지막 파라메터에 0을넣으면 달의 마지막 날짜를 구할 수 있다

// 지난 달 이번달 마지막 날짜 요일
const prevLast = new Date(viewYear, viewMonth, 0);
console.log(prevLast);
//어근데 왜 이건 지난달의 마지막 날짜가뜨지?
// viewmonth는 date.getmonth지?
// js는 1월이 0부터시작해 그러니 메소드로 현재달을 가져오면 (현재달-1)이라는 숫자값이 뜨는데 그걸 파라메터로 넣었잖아
const thisLast = new Date(viewYear, viewMonth + 1, 0);
console.log(thisLast);

const PLDate = prevLast.getDate();
console.log(PLDate);
const PLDay = prevLast.getDay();
console.log(PLDay);
//getDate날짜를 가져옴
//getDay요일을가져옴 (일요일0 ~토요일6)
const TLDate = thisLast.getDate();
console.log(TLDate);
const TLDay = thisLast.getDay();

// 달력에 연 월 표시
document.querySelector(".year-month").textContent = `${viewYear}년 ${
  viewMonth + 1
}월`;
//js 에서 월은 0부터시작 1월 = 0 2월 =1 3월=2 ....
// <div id='my_div'>
// 안녕하세요?     만나서 반가워요.
//   <span style='display:none'>숨겨진 텍스트</span>
// </>
// innerHtml(element attribute) = div내의 HTML전체 내용을 가져옴
// 안녕하세요?     만나서 반가워요.
//   <span style='display:none'>숨겨진 텍스트</span>

// outerHtml(element attribute) = div와함께 HTML전체 내용을 가져옴
// <div id='my_div'>
// 안녕하세요?     만나서 반가워요.
//   <span style='display:none'>숨겨진 텍스트</span>
// </div>

// innerText(element attribute) =  사용자에게 보여지는 텍스트를 가져옴
// 안녕하세요? 만나서 반가워요.

// textContent(Node attribute) = script나 stlye태그와 상관없이 해당 노드가 가진 텍스트값을 그대로읽음 (공백포함)
// 안녕하세요?     만나서 반가워요.
// 숨겨진 텍스트

//추가할때도 마찬가지로 태그와 글을 입력하면 innerHtml은 html을 추가하는 거니까 태그가 작동하지만
// innertext와 textContent는 텍스트를 추가하므로 태그를 텍스트로써 추가해 태그가 작동하지 않는다.
//https://velog.io/@raram2/%EB%8B%B9%EC%8B%A0%EC%9D%B4-innerHTML%EC%9D%84-%EC%93%B0%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0

// 날짜 배열들
const prevDates = [];
const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 근데 왜 오브젝트로 만든걸 다시 배열로 묶어서 슬라이스를 칠까? 그냥애초에 슬라이스치면안되나? 콘솔로 봐봐 이해가 쉽다
const nextDates = [];
console.log(thisDates);
// The keys() method returns a new Array Iterator object that contains the keys for each index in the array.
// key 프로토타입은 배열의 인덱스를 키로 가지는 새로운 오브젝트를 만들때 쓴다 (근데 그오브젝트가 Iterator object라는데 그게뭐지)

// The slice() method returns a shallow copy of a portion of an array into a new array object selected from
//  start to end (end not included) where start and end represent the index of items in that array.
//   The original array will not be modified.
// 어떤 배열의 start부터 end까지를 인덱스로가지는 새로운 배열을 만든다(not modified, end미포함)
// start값만 적으면 스타트부터 배열끝나는데까지로 잡고 만든다.
// syntax
// slice()
// slice(start)
// slice(start, end)

// const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

// console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

// console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

// console.log(animals.slice(-2));
// expected output: Array ["duck", "elephant"]

// console.log(animals.slice(2, -1));
// expected output: Array ["camel", "duck"]

// 넘어오고 넘어가는 날짜들계산
if (PLDay !== 6) {
  for (let i = 0; i < PLDay; i++) {
    prevDates.unshift(PLDate - i);
  }
}
//The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
// const array1 = [1, 2, 3];
// array1.unshift(4, 5);
// console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]

for (let i = 1; i <= 7 - TLDay; i++) {
  nextDates.push(i);
}
// The push() method adds one or more elements to the end of an array and returns the new length of the array.
// const animals = ['pigs', 'goats', 'sheep'];

// const count = animals.push('cows');
// console.log(count);
// expected output: 4
// console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows"]

// animals.push('chickens', 'cats', 'dogs');
// console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]

// 넘어오가는 날짜와 이달 날짜 합쳐주기
const dates = prevDates.concat(thisDates, nextDates);
console.log(dates);
// The concat() method is used to merge two or more arrays.
// This method does not change the existing arrays, but instead returns a new array.
// 기존의 있던 배열을 합쳐서 새로운 배열을 만들 때 쓴다  (기존배열은 변함없음)
// const array1 = ['a', 'b', 'c'];
// const array2 = ['d', 'e', 'f'];
// const array3 = array1.concat(array2);
// console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

// 날짜를 div로만들기
dates.forEach((date, i) => {
  dates[i] = `<div class="date">${date}</div>`;
});

//div들 html에 삽입
document.querySelector(".dates").innerHTML = dates.join("");

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// forEach
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join
// join
