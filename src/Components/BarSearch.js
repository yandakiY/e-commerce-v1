import React from 'react'
import '../StyleComponent/BarSearch.css'

const BarSearch = ({wordSearch , onChangeValue}) => {
  return (
    <div className='BarSearch'>
        <input type='search' value={wordSearch} onChange={e => onChangeValue(e)} className='form-control' placeholder='Search...' />
    </div>
  )
}

export default BarSearch