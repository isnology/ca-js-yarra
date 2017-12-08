import React from 'react'
import { createProduct, updateProduct } from '../api/products'

function ProductForm({ onProduct, action }) {
  return (
      <form
        onSubmit={ (event) => {
            event.preventDefault()
            const form = event.target
            const elements = form.elements
            const brandName = elements.brandName.value
            const name = elements.name.value
            onProduct({ brandName, name })
            elements.brandName.value = ''
            elements.name.value = ''
          }
        }
      >
        <div>
          <h2>New Product Entry</h2>
          <label>
            { 'Brand Name: ' }
            <input
                type='text'
                name='brandName'
            />
          </label>
          <label>
            { 'Name: ' }
            <input
                type='text'
                name='name'
            />
          </label>
          <button>
            { `${action} Product` }
          </button>
        </div>
      </form>
  )
}

export default ProductForm