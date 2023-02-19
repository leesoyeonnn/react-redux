/* @jsx createElement */
import {createElement, render, Component} from './react'; 

// class component는 React가 제공하는 Component를 extends 해야한다.
// class component는 render() 메소드를 반드시 가져야 한다. 

class Title extends Component {
  render() {
    // class component의 경우 props는 Component에 들어가 있기 때문에 this.props 로 접근한다.
    return <h1 style={`font-size: ${this.props.fontsize}`}>{ this.props.children }</h1>;
  }
}

function Item(props) {
  return <li style={`color:${ props.color }`}>{ props.children }</li>;
}


const App = () => <section>
  <Title fontsize="100px">React 클래스 컴포넌트 만들기</Title>
  <ul>
    <Item color="pink">첫 번째 아이템</Item>
    <Item color="skyblue">두 번째 아이템</Item>
    <Item>세 번째 아이템</Item>
  </ul>
</section>


render(<App />, document.querySelector('#root'));