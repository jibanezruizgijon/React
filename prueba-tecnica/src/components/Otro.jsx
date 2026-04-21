import { useCatImage } from "../hooks/useCatImage"
function Otro() {

    const { imagen } = useCatImage({ fact: "gato" })
    return (
        <>
            {imagen &&
                <img src={imagen} alt={`imagen extraida de la api`} />}
        </>
    )
}

export default Otro