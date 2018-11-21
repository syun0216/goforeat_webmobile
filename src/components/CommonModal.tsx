import React from 'react';

interface ICommonModal {
  children: React.ReactChild,
  clickOutSide: () => void
}

const CommonModal = (props:ICommonModal) => {
  return (
    <div className="am-drawer-overlay" style={{zIndex: 10,visibility: 'visible',opacity: 1}}>
      {props.children}
    </div>
  )
}

export default CommonModal;