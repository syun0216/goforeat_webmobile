import React from 'react';
//styles
import './CommonBottomBtn.less';

interface IBtn {
  clickFunc: () => void,
  text: string,
};

const CommonBottomBtn = (props: IBtn) => {
  return (
    <div className="main-button-area" onClick={props.clickFunc}>
        <div className="main-button">
          <span className="main-button-text">{props.text}</span>
        </div>
    </div>
  )
}

export default CommonBottomBtn;