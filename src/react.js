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
  } else {
    return {tag, props, children} ;
  }
}

// render 함수는 늘 새롭게 업데이트 되는 경우에 호출될테니 vdom은 늘 새롭게 실제 DOM에 적용할 객체다.
export function render(vdom, container) {
    container.appendChild(createDom(vdom))
}

export const render = (function() { 
  let prevDom = null;

  return function(vdom, container) { // closer를 만들기 위해서 즉시 새로운 함수를 return 한다.
    // prevDom이 closer에 갇혀서 바깥에서는 참조할 수 없고 내부적으로 매번 업데이트될 때마다 비교할 수 있는 logic을 삽입할 수 있는 구조가 만들어진다. 
    if(prevDom === null) {
      prevDom = vdom;
    }

    // diff (비교) 과정 생략
    // prevDom과 vdom의 객체 수준에서 비교해서 변경 사항만 업데이트된 새로운 객체를 만든 후 
    // 변경 사항 부분만 createDom에 전달한다.
    // createDom은 새로운 DOM을 만드는 함수라서 실제로는 새로운 DOM을 만드는 함수가 아닌 업데이트되는 함수에 전달한다.

    container.appendChild(createDom(vdom))
  }
})();
// 즉시 실행 함수를 한번 더 호출해서 내부 함수를 render에 넣어주면 
// return function(vdom, container) {
//   if(prevDom === null) {
//     prevDom = vdom;
//   }

//   // diff

//   container.appendChild(createDom(vdom))
// }
// 이 부분이 바깥으로 내보내진다. (export 해줘야함)