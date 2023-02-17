const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development', //최종적으로 서비스할 용도의 파일을 만드는 것 or 개발용 파일을 만드는 것 - development
  entry: './src/app.js', //어떤 자바스크립트 파일에서 시작할지에 대한 '입력 정보' 
  output: {
    // 어느 디렉토리에 쓸건지 (distribution의미를 가진 dist를 많이 쓰기도 한다. 혹은 output, bundle 이라는 디렉토리명을 사용하기도 하고 자유다!)
    // !! 디렉토리 명을 지정하 때 OS 별로 디렉토리 파일 시스템의 구조가 조금 달라서 개발자 컴퓨터 환경에서만 온전하게 동작한다면 문자열로 지정해줘도 되지만 
    // !! 약간의 처리 과정을 거쳐 주면 훨씬 더 안전하게 다른 컴퓨터환경에서도 이 프로젝트를 build할 때 문제없이 동작하게 할 수 있다.
    // !! 그래서 간단하게 node가 제공해주는 'path' 라는 패키지를 이용해서 디렉토리명을 안전하게 지정해본다. 
    // !! 우선 path를 쓰려면 가지고 와야한다. node.js 파일이기 때문에 가져올 때는 import가 아닌 require 구문을 사용한다. 
    // __dirname : node.js가 제공해주는 현재 디렉토리를 의미하는 상수 
    // path.resolve(__dirname, '출력할 디렉토리 명 지정')
    path: path.resolve(__dirname, 'dist'),  
    filename: 'bundle.js'//어떤 이름으로 쓸건지
  },

  devServer: {
    compress: true, // 압축유무 설정
    port: 9999, // 포트번호 설정
  },

  module: {
    rules: [ 
      //rule 안에 지정하는 것을 loader라고 한다. npm으로 설치했던 babel loader를 지정해주면 된다.
      // rules 키워드 -> n개의 loader를 지정할 수 있으므로 배열로 정의, use 키워드 -> 각각의 loader가 어떻게 동작할지에 대해서는 객체로 정의
      {
          //babel loader가 처리해야 할 파일은 javaScript 파일인데 입력되는 모든 파일이 js이외에 텍스트, 이미지, json, css 등등 처리해줄 수 없는 파일이 webpack을 통해서 들어올 수도 있다.
          // js파일이지만 transpile될 필요 없는 파일도 제거해줘야 한다. (e.g. node_modules 내의 js 파일) 포함되면 bundling됐을 때 크기가 너무 커질 수 있음
          // 처리해줄 수 없는 파일은 미리 제거해줄 수 있다.
          // test 속성명으로 정규식을 이용해서 옵션 지정 가능
        test: /\.js$/, //파일명은 상관없지만 .js 확장자인 파일만 처리
        exclude: /node_modules/, // 정규식으로 지정
        use: {
          loader: 'babel-loader', //설치한 loader의 이름
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"] //설치했던 babel의 plugin들을 세팅
          }
        }
      }



    ]
  },

  plugins: [
    // html-webpack-plugin : html파일을 입력 받아서 최종적으로 bundling 파일에 output으로 내보낼 때 html파일을 생성하거나 템플릿화 해서 부가적인 처리를 할 수 있음 
    // 외부 파일이라서 위쪽에 불러온다.
    new HtmlWebpackPlugin({ //HtmlWebpackPlugin는 new키워드로 instance를 만들어줘야하는데, 이런 정보들은 해당 플러그인의 공식페이지(npm)에서 확인 가능!!
      title: '2.3 setup webpack & babel',
      template: 'index.html', //어떤 html 파일을 사용할건지
    }) 
  ]
}