import React from 'react';

interface ICommonModal {
  children?: React.ReactChild,
  isShow: boolean,
  clickOutSide: () => void
}

const CommonModal = (props:ICommonModal) => {
  return (
    <div onClick={props.clickOutSide} className="am-drawer-overlay" style={{zIndex: 10,visibility: props.isShow?'visible':'hidden',opacity: props.isShow?1:0,position: "fixed"}}>
      {props.children}
    </div>
  )
}

export default CommonModal;