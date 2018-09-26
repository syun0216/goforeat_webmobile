import React from 'react';
import PropTypes from 'prop-types';
import {NavBar,Icon} from 'antd-mobile';
import { withRouter } from 'react-router-dom';
//styles
import './CommonHeader.less';

// So your ...rest will never contain staticContext 
const CommonHeader = ({canBack,rightContent,leftContent,children,staticContext, ...rest}) => {
  let _leftClick = () => {
    if(typeof rest.onLeftClick !== 'undefined') {
      rest.onLeftClick();
    }else {
      rest.history.goBack();
    }
  }
  return (
  <div className="nav-container">
    <NavBar
      mode="light" 
      className="nav-container"
      icon={canBack?<Icon type="left"/>:leftContent} 
      rightContent={rightContent} onLeftClick={_leftClick} {...rest}>
      {children}
    </NavBar>
  </div>
)}

CommonHeader.propsType = {
  canBack: PropTypes.bool,
  rightContent: PropTypes.array,
  leftContent: PropTypes.element
}

CommonHeader.defaultProps = {
  canBack: false,
  rightContent: [],
  leftContent: null
}

export default withRouter(CommonHeader);