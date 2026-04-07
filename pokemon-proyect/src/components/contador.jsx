import { useEffect, useState } from "react";

function Contador() {
    // variables de estado o de efecto
    const [contador, setContador] = useState(0);
    const [text , setText] = useState("Hola");

    // useEffect para escuchar cambios en el contador
    // EL [conatdor] es el array de dependencias, cada vez que el contador cambie se ejecutará el useEffect
    useEffect(() => {
        console.log("El contador ha cambiado a: " + contador);
    }, [contador]);

    const [isOnline, setIsOnline] = useState(true);
  return (
    <div>
        <h2>Contador {contador}</h2>
        <button onClick = {() => setContador(contador +1)}>Incrementar</button>
        <button onClick = {() => setContador(contador -1)}>Decrementar</button>
        <div>
            <h2>{text}</h2> 
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
        </div>
        <div>
            <p>{isOnline ? "Online" : "Offline"}</p>
            <button onClick={() => setIsOnline(!isOnline)}>Cambiar estado</button>
        </div>
    </div>
  )
}

export default Contador