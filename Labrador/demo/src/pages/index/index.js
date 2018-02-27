import wx, { Component } from 'labrador-immutable';
import Tabbar from '../../components/tab-bar/tab-bar';
import C1 from '../../components/c1/c1';
import Chooseimg from '../../components/chooseimg/chooseimg';


import {sleep, testFuc,click} from '../../utils/utils';

class Index extends Component {
  static propTypes = {

  };

  state = {
    titleInput: '',
    finished: 0
  };

  children() {

    return {
      tabBar:{
        component:Tabbar,
        key:'tab-bar',
      },
      C1:{
        component:C1,
          key:'C1',
       },
      Chooseimg:{
        component:Chooseimg,
        key:'Chooseimg',
      },
    };
  }
  // onUpdate() {
  // }
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

  click1(){
    return console.log("111")
  }

}

export default Index
