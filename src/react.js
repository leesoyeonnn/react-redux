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
  
  return {tag, props, children} ;
}

// 어떤 컨테이너만 받고 appendChild() 동작을 숨겨보기
export function render(vdom, container) {
    container.appendChild(createDom(vdom))
}