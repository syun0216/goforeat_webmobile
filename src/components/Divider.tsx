import React from 'react';

interface IDivider{
  height: string,
  bgColor: string
}

const Divider = ({height, bgColor}:IDivider) => (
  <div style={{height:height,backgroundColor:bgColor}} />
)