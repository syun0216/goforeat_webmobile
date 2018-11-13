import React from 'react';

interface IDivider{
  height: string,
  bgColor: string
}

const divider = ({height, bgColor}:IDivider) => (
  <div style={{height,backgroundColor:bgColor}} />
)

export default divider;