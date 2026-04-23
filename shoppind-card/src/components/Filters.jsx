import './Filters.css'
function Filters() {
  return (
    <section className="filters">
        <div>
            <label htmlFor="price">Price</label>
            <input 
            type="range" 
            id="price" 
            min={0}
            max={1000}
            />
        </div>

        <div>
            <label htmlFor="category">Categoría</label>
            <select name="category" id="category">
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