import { Component, PropTypes } from 'labrador-immutable';
import wx from 'labrador-immutable';

const { string, bool } = PropTypes;

class Chooseimg extends Component {
  static propTypes = {
      imgsrc:string,
  };



  constructor(props) {
    super(props);
    this.state = {
        imgsrc:"abc"
    }
  }

  children() {
    return {};
  }
  async chooseimg(){
    var that=this;
    await wx.chooseImage({
        count:1,
        sourceType:["album","camera"],
        success:function(res){
          console.log(res)
            // that.setState({
            //     imgsrc:res.tempFilePaths
            // })
        },
        fail:function () {
            console.log("error")
        },
    })
  }
  // onLoad() {
  // }

  // onReady() {
  // }

  // onUpdate() {
  // }

  // onShow() {
  // }

  // onHide() {
  // }

  // onUnload() {
  // }

}

export default Chooseimg;

// export default connect(
//   (state)=>({})
// )(chooseimg);
