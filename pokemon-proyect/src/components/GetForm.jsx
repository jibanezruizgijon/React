import { useState } from 'react';
function GetForm(props) {
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getPokemons(from, to);
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="from-pokemon">Desde:</label>
        <input type="number" id="from-pokemon" min={1} onChange={(e) => setFrom(parseInt(e.target.value))} />

        <br /><br />

        <label htmlFor="to-pokemon">Hasta:</label>
        <input type="number" id="to-pokemon" onChange={(e) => setTo(parseInt(e.target.value))} />

        <br /><br />

        <input type="submit" value="Buscar" />
      </fieldset>
    </form>
  )
}

export default GetForm