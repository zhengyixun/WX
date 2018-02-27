import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
// import { tab } from "../../utils/utils";

const { any } = PropTypes;

class tabBar extends Component {
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
    return {

    };
  }
  async tabs(){
    await console.log("asd");
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

export default tabBar;

// export default connect(
//   (state)=>({})
// )(tabBar);
