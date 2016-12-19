#React - jsx

## jsx的基本语法规则
1. 遇到html标签（以<开头的），就把他当做html结构解析，代码遇到代码块（以{ 开头），就用js规则解析。
2. JSX允许直接在模板中插入js变量。如果是一个数组，就会展开这个数组。（貌似不能直接展开一个对象）；

##react组件
react允许把代码封装为一个组件，然后想插入普通HTML标签一样，在网页中插入这个组件
1. 方法
	+ React.createClass();
2. eg:
	```react
	var HelloMessage = React.createClass(
		render:function(){
			//this就是这个组件对象，可以通过组件使用传入一些参数
			return <h1>hello this.props.name</h1>
		}
	);
	ReactDOM.render(
		//当一个组件创建完成之后，就可以通过一个类似html的自闭合标签来使用，可以通过属性的方法把值传到组件对象中的props属性中。
		<HelloMessage name='JIE'/>,
		document.getElementById('react')
	)
	```
3.  注意点：
	+ 所有的组件都必须要有个render方法，用于输入组件
	+ 组件的第一个字母必须大写，否则会报错
	+ 组件类只能包含一个顶层标签，否则会报错
	+ 组件使用时，要注意原生ES的保留字等，比如属性不能只写写class
	```
	//这种做法会报错，必须只有一个大容器包裹
	var HelloMessage = React.createClass(
		render:function(){
			<div desc=''></div>
			<div></div>
		}
	);
	```
## 组件的this.props.children
1. this.props对象与组件使用时传入的属性一一对应，但有一个例外就是this.props.children属性，他表示组件的所有子节点。
```
	var NodeList = React.createClass(
		render:function(){
			//可以直接返回一个括号对象
			return (
				<ol>
					React.children.map(this.porps.children,function(item){
						return <li>{item}</li>
					})
				</ol>
			)
		}
	);
	
	ReactDOM.render(
		<NodeList>
			<span>hello</span>
			<span>world</span>
		</NodeList>,
		document.getElementById('react')
	)

	输出结果如下：
	1.hello
	2.world
```
+ 注意点
	1. this.props.children的值有三种，当前组件没有子节点时，返回undefined,如果有一个子节点，数据类型Object，如果有多个子节点，数据类型是Array。
	2. React提供的迭代方法-> React.children来处理this.props.children。可以使用React.children来遍历子节点，不用担心this.props.children的数据类型。

## PropTypes
1. 组件的属性可以接收任何值，字符串、对象、函数都可以，有时候我们需要一种机制，在验证别人使用组件时，提供的参数是否符合要求。
2. 组件类的React.PropTypes属性，就是用来验证组件实例的属性是否符合要求
3. propTypes是一个组件属性对验证对象，可以配置组件属性的传入数据类型以及是否必须等等

##获取真事DOM节点
1. 组件并不是真实的DOM - Virtual DOM
2. this.refs对象就是在虚拟DOM插入DOM TREE后生成的，如果在插入DOM TREE之前就使用这个属性的话，会报错！可以动态获取到DOM节点上的数据。
3. React 组件支持很多事件，除了 Click 事件以外，还有 KeyDown 、Copy、Scroll 等，完整的事件清单请查看官方文档。
4. 要使用refs必须在组件元素中写入一个ref,refs会根据这个属性的值区寻找这个DOM元素，相当于ID

## this.state
React的一大创新，就是将组件看成一个状态机，一开始有一个初始状态 --> 用户互动 --> 状态变化 --> 重绘UI

```
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
	//setState 会重绘UI
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

## 组件的生命周期
1. 组件生命周期的三个状态
	+ Mounting: 已插入真事DOM TREE
	+ Updating : 正在被重新渲染
	+ Unmounting : 已经被移出DOM TREE
2. React为每个状态都提供了两种回调函数，will函数实在进入状态之前调用，did是在进入状态之后调用
	+ componentWillMount()
	+ componentDisMount();
	+ componentWillUpdata(obj,nextProps,objNextState)
	+ componentDidUpdata(obj,preProps,objPreState)
	+ componentWillUnmount()
3. 特殊状态处理函数
	+ componentWillRecieveProps(obj ,nextProps) -> 已加载组件收到新的参数时调用
	+ shouldComponentUpdata(obj,nextProps,nextState) -> 组件判断是否重新渲染时调用
4. eg
```javascript
	var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.body
);
``` 