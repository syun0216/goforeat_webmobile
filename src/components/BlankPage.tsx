import React from 'react';


interface IBlankPage {
  message: string,
}

const styles = {
  container: {

  },
  img: {
    width: '100%'
  }
}

const blankPage = ({message}: IBlankPage) => {
  return (
    <div>
      <img style={styles.img} src={require('@/assets/upset.png')} alt="upset"/>
      <p>{message}</p>
    </div>
  )
}

export default blankPage;