function Login(props) {
    const user = {
        name: '',
        email: ''
    }

    const setName = (e) => {
        user.name = e.target.value;
    }

    const setEmail = (e) => {
        user.email = e.target.value;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.ManejarLogin(user);
    }
    return (

        <section className="section__login">
            <h2>Formulario de Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" onChange={setName}/>
                <br /><br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={setEmail} />
                <button>Login</button>
            </form>
        </section>
    )

}

export default Login