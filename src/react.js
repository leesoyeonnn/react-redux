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

  if (typeof tag === 'function') {
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } else {      
      if (children.length > 0) { 
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
