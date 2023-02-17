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
  // 실제로 tag의 앞글자가 대문자라면 함수로 인식하는 규칙을 가진다.
  if (typeof tag === 'function') {
    // 함수에 전달된 props에 childrne 이 들어오면 props에 children이라는 key를 만들어서 거기다가 넣어 주는 식으로 react처럼 만들어본다.
    // 만들어진 vdom 객체의 구조를 보면 children은 3번째 인자로 들어오는데 
    // 함수 component에서 props를 1번째 인자로 children을 2번째 인자로 따로 구분해서 받도록 하지 않고 
    // props로 받아서 props.children으로 받게끔 디자인 했다. 이건 특별한 코드라기 보다는 react팀의 디자인이라고 볼 수 있다. 
    // children이 하나 이면 단순 값으로 받고 둘 이상이면 배열로 받는다. 
    if (children.length > 0) {
      return tag({
        ...props,
        children: children.length === 1 ? children[0] : children,
      })
    } else {
      // 함수가 리턴하는 jsx값이 ->  createElement() 함수 호출로 변환되고 -> 결과적으로는 createElement() 반환 값(객체)이 리턴된다.
      return tag(props); 
    }

  } else {
    return {tag, props, children} ;
  }

}

// 어떤 컨테이너만 받고 appendChild() 동작을 숨겨보기
export function render(vdom, container) {
    container.appendChild(createDom(vdom))
}