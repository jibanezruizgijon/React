function DetailWrapper(DetailsComponent) {
    function NewComponent(props) {
        const [likes, setLikes] = useState(0);
        const aumentarLikes = ()=> {
            setLikes (likes +1);
        }
        return (
            <DetailsComponent pokemon={props.pokemon} likes={likes} aumentarLikes={aumentarLikes}>
                
            </DetailsComponent>
        )
    }
    return NewComponent

}

export default DetailWrapper