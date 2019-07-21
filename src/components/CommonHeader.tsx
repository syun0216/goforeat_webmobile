import React,{ ReactNode } from 'react';
import {NavBar, Icon} from 'antd-mobile';
import { withRouter } from 'react-router-dom';
//styles
import './CommonHeader.less';

// interface ICommonHeader {
//   canBack?: boolean,
//   rightContent?: ReactNode[],
//   leftContent?: null | ReactNode,
//   children?: ReactNode,
//   staticContext: any,
//   rest: any[]
// }

const commonHeader = ({canBack, rightContent, leftContent, children, staticContext, ...rest}: any) => {

  const _leftClick = () => {
    if(typeof rest.onLeftClick !== 'undefined') {
      rest.onLeftClick();
    }else {
      rest.history.goBack();
    }
  }

  return (
    <div className="nav-container">
      <NavBar mode="light" className="nav-container"
      icon={canBack ? <i className="icon iconfont icon-left back-arrow" /> : leftContent}
      onLeftClick={_leftClick} 
      rightContent={rightContent} {...rest}>
        {children}
      </NavBar>
    </div>
  )
}


export default withRouter(commonHeader);