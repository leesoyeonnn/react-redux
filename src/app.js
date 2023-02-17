/* @jsx createElement */
import {createDom, createElement, render} from './react'; 

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