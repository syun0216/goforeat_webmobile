import React from 'react';
import PropTypes from 'prop-types'

const Divider = ({height,bgColor}) => (
  <div style={{height:height,backgroundColor:bgColor}} />
)

Divider.defaultProps = {
  height:10,
  bgColor: '#ccc'
}

Divider.propTypes = {
  height: PropTypes.number,
  bgColor: PropTypes.string
}

export default Divider