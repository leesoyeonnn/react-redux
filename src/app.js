/* @jsx createElement */
import {createElement, render} from './react'; 

// 함수 component 규칙
// 함수 component는 대문자로 시작해야 한다.
// 함수 component는 반드시 jsx 구문을 return 해야 한다.
// 호출할 때 jsx 규칙에 따라 FuncName() 형태가 아닌 <FuncName></FuncName> 형태로 호출한다.
// => React는 대문자로 시작하는 이름의 태그는 함수로 인식한다.
// => 함수로 구별되면 createElement()는 문자열로 받지 않는다.
// => 함수의 리턴값 jsx 문법이 createElement() 함수 호출 구문으로 변환되고 결과적으로 createElement() 함수가 리턴한 객체 값을 리턴한다.

// 함수 component는 1번쨰 인자로 props를 받는다. props로 전달된 데이터를 활용한다.
// <Title>React 잘 만들기</Title>의 'React 잘 만들기'는 component의 children으로 넘기고 싶다.
// props.children은 문자열이 아닌 자바스크립트 코드로 인식시켜 주기위해 Jsx에서는 Brace로 구분해준다.

function Title(props) {
  return <h1>{ props.children }</h1>;
}

function Item(props) {
  return <li style={`color:${ props.color }`}>{ props.children }</li>;
}

// vdom은 App은 아니지만 App처럼 메인 컴포넌트 이므로 App 이라는 이름의 함수로 변경해본다.
const App = () => <section>
  <Title>React 만들기</Title>
  <ul>
    <Item color="pink">첫 번째 아이템</Item>
    <Item color="skyblue">두 번째 아이템</Item>
    <Item>세 번째 아이템</Item>
  </ul>
</section>

// Jsx 문법을 이용해 vdom이 아닌 <App /> 으로 전달한다.
render(<App />, document.querySelector('#root'));