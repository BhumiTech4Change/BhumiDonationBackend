import React from 'react'
import spinner from './spinner.gif'
const Spinner = ({ width = '200px' }) => (
  <>
    <img
      src={spinner}
      alt='Loading....'
      style={{ width, margin: 'auto', display: 'block' }}
    />
  </>
)

export default Spinner
