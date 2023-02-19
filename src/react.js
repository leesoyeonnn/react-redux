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

export function createElement(tag, props, ...children) {
  props = props || {};

  if (typeof tag === 'function') { // typeof 연산자는 function, Class 모두 function으로 return

    if (tag.prototype instanceof Component) { // Class Component를 상속받았은 Class인 경우

      const instance = new tag(makeProps(props, children));
      return instance.render(); // render() 메서드를 꼭 호출해줘야 한다.
    
    } else { // 일반 함수인 경우
      
      if (children.length > 0) {
        return tag(makeProps(props, children));
      } else {
        return tag(props); 
      }
    }
  } else {
    return {tag, props, children} ;
  }
}

export function render(vdom, container) {
    container.appendChild(createDom(vdom))
}