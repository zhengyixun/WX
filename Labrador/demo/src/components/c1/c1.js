import { Component, PropTypes } from 'labrador-immutable';
import wx from "labrador-immutable";

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
        var that=this;
        await wx.chooseVideo({       //获取本地视频
            sourceType: ['album','camera'],
            maxDuration: 10,
            success: function(res) {
                // console.log(res)
                that.setState({
                    videoHidden: false,
                    videoSource: res.tempFilePath,
                })
            },
            fail:function(){
                wx.showToast({ title: 'error' });
            }
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

export default C1;

