import React from 'react';

interface IGIcon{
  icon: any,
  imgName: string,
  imgClassName: string
}

const generateIcon = (icon: any,imgName: string,imgClassName: string="tab-icon") => {
  return <img className={imgClassName} src={icon} alt={imgName}/>
}

export default generateIcon;