# labrador开发问题汇总（一）

1.component中直接写catchtap事件

index.xml中

```
<view class="tab-bar" id="tab" catchtap="tab">
	tabBar
</view>
```

index.js中

```
tab(){
    console.log("tab");
}
```

开发者工具中运行

```
报错：Can not resolve component by path abc
```

##### 正确格式

index.xml

```
<view class="BF" catchtap="clicks">
123456
    <component key="tabBar" name="tab-bar"/>
</view>
```

index.js

```
import Tabbar from '../../components/tab-bar/tab-bar';3



return {
      tabBar:{
        component:Tabbar,
        key:'tab-bar',
      },
 }     
```

2.运行命令行语句 labrador watch中修改xml，或js或其他文件，都会被排除（ingore）在外，并且不能实时的监控对代码的修改

 解决方案：重新运行labrador watch一下

3.组件中写函数需要在index.js中引入一下，直接看例子

在components文件夹下新建一个home组件，目录结构如下

```
...
 + components
   + home
     + home.js
     + home.less
     + home.test.js
     + home.xml
     
```

home.xml

```
<view class="home" catchtap="home">
    home
</view>
```

home.js

```
import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';

const { any } = PropTypes;

class home extends Component {
  static propTypes = {
    foo: any
  };

  static defaultProps = {
    foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }
  children() {
    return {};
  }
  async home(){
    await console.log("home")
  }
}
export default home;
```

在index.xml中

```
<view>
    <component key="home" name="home"/>
</view>
```

index.js

```
import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import home from '../../components/home/home';

import {sleep, testFuc,click} from '../../utils/utils';
const { array, func } = PropTypes;

class Index extends Component {
  static propTypes = {
    todos: array,
    removeTodo: func,
    restoreTodo: func,
    createTodo: func,
    finishTodo: func
  };

  state = {
    titleInput: '',
    finished: 0
  };

  children() {
    let todos = this.props.todos || [];
    let unfinished = [];
    let finished = [];
    if (todos.length) {
      unfinished = todos.filter((todo) => !todo.finished);
      finished = todos.asMutable()
        .filter((todo) => todo.finished)
        .sort((a, b) => (a.finishedAt < b.finishedAt ? 1 : -1))
        .slice(0, 3);
    }
    return {
      home:{
        component:home,
        key:'home',
      },
     
      list: unfinished.map((todo) => ({
        component: Todo,
        key: todo.id,
        props: {
          ...todo,
          onRemove: this.handleRemove,
          onRestore: this.handleRestore,
          onFinish: this.handleFinish
        }
      })),
      finished: finished.map((todo) => ({
        component: Todo,
        key: todo.id,
        props: {
          ...todo,
          onRemove: this.handleRemove,
          onRestore: this.handleRestore,
          onFinish: this.handleFinish
        }
      })),
    };
  }

  onUpdate(props) {
    let nextState = {
      finished: 0
    };
    props.todos.forEach((todo) => {
      if (todo.finished) {
        nextState.finished += 1;
      }
    });
    this.setState(nextState);
  }

  async onPullDownRefresh() {
    await sleep(1000);
    await console.log(testFuc("testFuc"));
    wx.showToast({ title: '刷新成功' });
    wx.stopPullDownRefresh();
  }

  clicks(){
    console.log(click("click"));
    wx.showToast({ title: 'click' });
  }

  handleCreate() {
    let title = this.state.titleInput;
    if (!title) {
      wx.showToast({ title: '请输入任务' });
      return;
    }
    this.props.createTodo({ title });
    this.setState({ titleInput: '' });
  }
  handleInput(e) {
    this.setState({ titleInput: e.detail.value });
  }
  click1(){
    return console.log("111")
  }
  handleRemove = (id) => {
    this.props.removeTodo(id);
  };

  handleFinish = (id) => {
    this.props.finishTodo(id);
  };

  handleRestore = (id) => {
    this.props.restoreTodo(id);
  };

  handleShowFinished() {
    wx.navigateTo({ url: 'finished' });
  }

  handleShowUI() {
    wx.navigateTo({ url: '/pages/ui/index' });
  }
}

export default connect(
  ({ todos }) => ({ todos }),
  (dispatch) => bindActionCreators({
    createTodo: todoActions.create,
    removeTodo: todoActions.remove,
    finishTodo: todoActions.finish,
    restoreTodo: todoActions.restore,
  }, dispatch)
)(Index);
```

4.基于labrador 0.6 x ------ 

```
import { Component, PropTypes } from 'labrador-immutable';

const { string, bool } = PropTypes;

class C1 extends Component {
  static propTypes = {
      videoSource: string,
      videoHidden:bool,
  };

  constructor(props) {
    super(props);
    this.state = {
        videoSource:"",
        videoHidden:true,
    }
  }

  children() {
    return {

    };
  }
  async videos(){
    await wx.chooseVideo({

    })
  }
  }
```

index.xml  

引用js中 的数据需要state.  或者props.

```
<view class="c1" >
    <text catchtap="videos">wx.choosevideo</text>
    <video src="{{state.videoSource}}" hidden="{{state.videoHidden}}" style="width: 100%; height: 300rpx"/>
</view>
```

## 0.6版本升级指南

#### 1.   labrador API调整

```
import wx from 'labrador';
class Index extends wx.Component{}
```

更新为

```
import wx, { Component } from 'labrador';
class Index extends Component{}
```

#### 2. propType

0.6版本后propTypes必须是组件类静态属性 static propTypes={

#### 3.defaultProps

0.6以后props={} 更新为  static defaultProps={}

#### 4.setState

请将所有的 `setData` 更新为 `setState`，并且不支持 `setState(key,value)`  使用setState（{key：value}），将组件内所有的 `this.data.*` 更新为 `this.state.*`。

#### 5.更新模板绑定

模板中所有变量绑定需要增加指定 `state.` 或 `props.` 。

```
 <view>
    <text class="{{state.className}}">{{props.title}}</text>
    <template is="foo" data="{{...state.obj,bar:state.bar}}"/>
  </view>
```



## 日期02-27

1.问题描述：通过 labrador generate component home 创建home组件，当对less进行改变后再控制台输出

```
ignore src\components\chooseimg\home.less

```

并且，在微信开发者工具中查看样式并没有发生变化。

原因：在home.less中修改成功，IDE成功的检测到变化，但是并没有作用到组件中去所以出现ignore src\components\chooseimg\home.less，也就是说修改的样式并没有最终作用到生成的小程序中去，

解决方案：在app.less中import一下

```
@import "components/chooseimg/chooseimg.less";
```

这样吧组件中的less，关联到app.less，会产生变化