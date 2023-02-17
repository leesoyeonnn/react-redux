/* @jsx createElement */
import {createDom, createElement, render} from './react'; 

// 함수 component 규칙
// 함수 component는 대문자로 시작해야 한다.
// 함수 component는 반드시 jsx 구문을 return 해야 한다.
// 호출할 때 jsx 규칙에 따라 FuncName() 형태가 아닌 <FuncName></FuncName> 형태로 호출한다.
// => React는 대문자로 시작하는 이름의 태그는 함수로 인식한다.
// => 함수로 구별되면 createElement()는 문자열로 받지 않는다.
// => 함수의 리턴값 jsx 문법이 createElement() 함수 호출 구문으로 변환되고 결과적으로 createElement() 함수가 리턴한 객체 값을 리턴한다.

function Title() {
  return <h1>React 잘 만들기</h1>;
}

const vdom = <section>
  <Title></Title>
  <h1>React 만들기</h1>
  <ul>
    <li style="color:red">첫 번째 아이템</li>
    <li>두 번째 아이템</li>
    <li>세 번째 아이템</li>
  </ul>
</section>

console.log(vdom);

render(vdom, document.querySelector('#root'));