
function TwitterFollowCard({username, name, isFollwing}) {
    const text = isFollwing ? 'Siguiendo' : 'Seguir'
 
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
            <button className="tw-followCard-button">{text}</button>
        </aside>
    </article>
  )
}

export default TwitterFollowCard