import { useState, useId } from 'react'
import './Filters.css'
function Filters({onChange}) {
    const [minPrice, setMinPrice] = useState(0)

    const minPriceFilterID = useId() 
    const categoryFilterID = useId()
    const handleChangeMinPrice = (e) => {
        setMinPrice(e.target.value)
        onChange(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        onChange(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Price</label>
                <input
                    type="range"
                    id={minPriceFilterID}
                    min={0}
                    max={1000}
                    onChange={handleChangeMinPrice}
                />
                <span>{minPrice}</span>
            </div>

            <div>
                <label htmlFor="category">Categoría</label>
                <select name="category" id={categoryFilterID} onChange={handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="fragrances">Fragancia</option>
                    <option value="beauty">Maquillaje</option>
                    <option value="groceries">Groceries</option>
                    <option value="furniture">Furniture</option>
                </select>
            </div>

        </section>
    )
}

export default Filters