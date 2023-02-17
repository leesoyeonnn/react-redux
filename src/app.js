import {createDom, createElements, render} from './react'; 

// const vdom = {
//   tag: 'section',
//   props: {}, 
//   children: [
//     {
//       tag: 'h1',
//       props: {},
//       children: ['React 만들기']
//     },
//     {
//       tag: 'ul',
//       props: {},
//       children: [
//         {
//           tag: 'li',
//           props: {
//             style: "color: red",
//           },
//           children: ['첫 번째 아이템']
//         },
//         {
//           tag: 'li',
//           props: {},
//           children: ['두 번째 아이템']
//         },
//         {
//           tag: 'li',
//           props: {},
//           children: ['세 번째 아이템']
//         }
//       ]
//     }
//   ]
// }

const vdom = createElements('section', {}, 
  createElements('h1', {}, 'React 만들기'),
  createElements('ul', {}, 
    createElements('li', {style: "color: red"}, '첫 번째 아이템'),
    createElements('li', {}, '두 번째 아이템'),
    createElements('li', {}, '세 번째 아이템')
  )
);

console.log(vdom)

render(vdom, document.querySelector('#root'));