import React from 'react'

function ToggleButton({ children, text, onToggleChange }) {
  return (
      <button type="button"
              onClick={ (event) => {
                onToggleChange()
              }
              }
      >
        { text }
        { children }
      </button>
  )
}

export default ToggleButton