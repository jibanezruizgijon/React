import { useState } from "react"
function TwitterFollowCard({ username, name, initialIsFollowing }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';
    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img src="https://unavatar.io/whatsapp/channel%3A0029VaARuQ7KwqSXh9fiMc0m" />
                <div>
                    <strong>{name}</strong>
                    <span>@{username}</span>
                </div>
            </header>
            <aside>
                <button onClick={handleClick} className={buttonClassName}>
                   <span className="followText">{text}</span> 
                    <span className="stopFollow">Dejar de Seguir</span>
                </button>
            </aside>
        </article>
    )
}

export default TwitterFollowCard