import React from 'react';
import PropTypes from 'prop-types';
import {NavBar,Icon} from 'antd-mobile';
import './CommonHeader.less';

const CommonHeader = ({canBack,rightContent,leftContent,children,...rest}) => (
  <div className="nav-container">
    <NavBar
      mode="light" 
      icon={canBack?<Icon type="left"/>:leftContent} 
      rightContent={rightContent} {...rest}>
      {children}
    </NavBar>
  </div>
) 

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

export default CommonHeader;