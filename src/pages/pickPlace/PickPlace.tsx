import React, {Component} from 'react';
import { IPlaceList } from '../../interfaces/server';
//component
import CommonHeader from '../../components/CommonHeader';
//style
import './PickPlace.less';

export default class PickPlace extends Component<{}, {}> {

  public render() {
    const PlaceList = JSON.parse(sessionStorage.getItem('placeList') || '[]');
    return(
      <div>
        {this._renderHeader()}
        <ul className="pick-place-container">
          {
            PlaceList.map((item: IPlaceList) => (
              <li className="pick-place-item" key={item.id}>
                <img className="pick-place-img" src={item.picture}/>
                <span className="pick-place-label">{item.name}</span>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  //render
  private _renderHeader() {
    return (
      <CommonHeader canBack>
        <span className="title">
          配送点
        </span>
      </CommonHeader>
    );
  }

}