export function createDom(node) {
  if(typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  // attribute 지정하기
  // props 객체에는 여러 속성(key)들이 있을 수 있어서, key를 문자열로 빼내서 작성 -> Object.keys() or Object.entries()
  Object.entries(node.props)
    .forEach(([name, value]) => element.setAttribute(name, value));

  node.children
    .map(createDom)
    .forEach(element.appendChild.bind(element))

  return element;
}

// tag, props, children 3속성을 가지는 element 만들기
export function createElement(tag, props, ...children) {
  props = props || {};

  // tag가 함수인지 문자열인지 구분하기
  // tag의 앞글자가 대문자라면 함수 라는 규칙을 가진다. (실제 React 규칙과 같도록 작성해보기)
  if (typeof tag === 'function') {
    return tag(); //함수가 리턴하는 jsx값이 ->  createElement() 함수 호출로 변환되고 -> createElement() 반환 값이 리턴된다.
  } else {
    return {tag, props, children} ;
  }

}

// 어떤 컨테이너만 받고 appendChild() 동작을 숨겨보기
export function render(vdom, container) {
    container.appendChild(createDom(vdom))
}