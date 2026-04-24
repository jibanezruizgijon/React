import { useState } from 'react'
import Products from './components/Products'
import { products as initialProducts } from './mocks/products'
import Header from './components/Header'
import Footer from './components/Footer'

function useFilters() {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }
  return {filterProducts, setFilters, filters}
}
function App() {
const {filterProducts, setFilters, filters} = useFilters()
const [products] = useState(initialProducts) 
  const filteredProducts = filterProducts(products)
  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
      <Footer filters={filters}/>
    </>
  )
}

export default App