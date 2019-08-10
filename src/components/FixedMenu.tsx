import React from 'react';
//styles
import './FixedMenu.less';

interface IList {
  type: string,
  name: string,
  clickFunc: (type: string) => void
}

interface IMenu {
  list: IList[],
  position: any,
  closeFunc: () => void
}

interface IPosition {
  x: string | number,
  y: string| number
}

const FixedMenu = (props: IMenu) => {
  const { list, position, closeFunc } = props;
  console.log(position);
  const _screenWidth: number = document.querySelector('body')!.offsetWidth;
  const _screenHeight: number = document.querySelector('body')!.offsetHeight;
  const _formatX: any = position.x > _screenWidth / 2 ? {right: _screenWidth - position.x} : {left: position.x};
  const _formatY: any = position.y > _screenHeight / 2 ? {bottom: _screenHeight - position.y} : {top: position.y};
  return (
    <div className="fixed-menu-container" onClick={closeFunc}>
      <ul className="fixed-menu-content" style={{..._formatX, ..._formatY}}>
        {
          list.map((item, idx) => (
            <li className="menu-item" key={idx} onClick={() => item.clickFunc(item.type)}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default FixedMenu;