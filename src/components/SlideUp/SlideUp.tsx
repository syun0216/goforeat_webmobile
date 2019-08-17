import React,{Component} from 'react';
//styles
import './SlideUp.less';


interface ISlideUp {
  isShow: boolean;
  closeFunc: () => void;
  height: number,
  title: string
}

export default class SlideUp extends Component<ISlideUp, {}> {


  public render() {
    const { title, height, isShow, children, closeFunc} = this.props;
    const curStyle = isShow ? {height: `${height}rem`, bottom: 0} : {height: `${height}rem`, bottom: `-${height}rem`};
    console.log('curStyle', curStyle);
    return (
      <div className="slide-up-container">
        <div className="mask" onClick={closeFunc} style={isShow ? {opacity: 0.7, zIndex: 90} : {opacity: 0, zIndex: -1}}/>
        <div className="slide-up-content" style={{...curStyle}}>
          <p>{title}</p>
          <div style={{overflow: 'scroll'}}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}