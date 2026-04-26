import Filters from "./Filters"
function Header({changeFilters}) {
  return (
    <div>
        <h1>React shop </h1>
        <Filters onChange={changeFilters}></Filters>
    </div>
  )
}

export default Header