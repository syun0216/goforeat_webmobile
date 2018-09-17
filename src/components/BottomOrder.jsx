import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  bottomContainer: {
    height: '50px',
    width: '100%',
    background: 'white',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1em'
  },

};

const BottomOrder = ({isShow,btnMessage,btnClick,canClose}) => {
  return (
    <div style={styles.bottomContainer}>
      <div>
        <span></span>
      </div>
      <div>345</div>
    </div>
  )
}

BottomOrder.propsTypes = {
  isShow: PropTypes.bool,
  btnMessage: PropTypes.string,
  btnClick: PropTypes.func,
  canClose: PropTypes.bool
}

BottomOrder.defaultProps = {
  isShow: false,
  btnMessage: '立即預訂',
  btnClick: () => {},
  canClose: true
}

export default BottomOrder;
