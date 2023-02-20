const hooks = []; //Hook은 순서가 필요
let currentComponent = 0; //순서를 제어하기 위한 변수 

export class Component {
  constructor(props) {
    this.props = props;
  }
}

export function createDom(node) {
  if(typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props)
    .forEach(([name, value]) => element.setAttribute(name, value));

  node.children
    .map(createDom)
    .forEach(element.appendChild.bind(element))

  return element;
}

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
}

function useState(initValue) { //useState는 1번째 인자로 항상 초기값을 받는다.
  //useState()가 실행되면 hooks에 값을 저장해야 한다. 그 값을 안쪽에서 저장하면 안된다. 유지해야해서 바깥쪽에 hooks를 만들어두었다. 

  let position = currentComponent - 1;

  // 기존 값이 있으면 초기값을 넣으면 안된다. 
  if(!hooks[position]) {//hooks에 값이 없으면
    hooks[position] = initValue;
  }

  //값을 바꾸는 함수
  //hooks의 값은 바깥쪽(component쪽)에서 접근할 수 없기 때문에 modifier에 통해서만 수정될 수 있는 구조
  const modifier = nextValue => {
    hooks[position] = nextValue;
  }

  return [ hooks[position], modifier]
}

export function createElement(tag, props, ...children) {
  props = props || {};

  if (typeof tag === 'function') {
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } else {

      hooks[currentComponent] = null; //초기 세팅
      //createElement()가 한 번 실행될 때마다 component 하나가 만들어진다.
      //함수 호출 후에는 그 다음 component가 만들어져야 하니 currentComponent 증가
      currentComponent++;
      
      if (children.length > 0) { // 함수 component가 호출되는 지점
        return tag(makeProps(props, children));
      } else {
        return tag(props); 
      }
    }
  }
  
  return {tag, props, children} ;
}

export function render(vdom, container) {
    container.appendChild(createDom(vdom))
}
