/* @jsx createElement */
import {createDom, createElement, render} from './react'; 

// const vdom = createElement('section', {}, 
//   createElement('h1', {}, 'React 만들기'),
//   createElement('ul', {}, 
//     createElement('li', {style: "color: red"}, '첫 번째 아이템'),
//     createElement('li', {}, '두 번째 아이템'),
//     createElement('li', {}, '세 번째 아이템')
//   )
// );

const vdom = <section>
  <h1>React 만들기</h1>
  <ul>
    <li style="color:red">첫 번째 아이템</li>
    <li>두 번째 아이템</li>
    <li>세 번째 아이템</li>
  </ul>
</section>

console.log(vdom);

render(vdom, document.querySelector('#root'));