import './HeaderComponent.css';
function HeaderComponent(props) {
        const { greeting, links} = props;
    return (
        <header className='header'>
            <h1 className='title'>{greeting}</h1>
            <nav>
                <ul className='header__list'>
                    <li><a className='header__link' href="#">{links.inicio}</a></li>
                    <li><a className='header__link' href="#">{links.acerca}</a></li>
                    <li><a className='header__link' href="#">{links.contacto}</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default HeaderComponent;