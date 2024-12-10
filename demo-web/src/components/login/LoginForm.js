import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { login } from '../../api/loginApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Preencha todos os campos');
            return;
        }
        try {
            console.log(`Email: ${email}, Senha: ${password}`);

            // Chama a função de login
            const response = await login(email, password);
            
            // Armazena o token no localStorage
            localStorage.setItem('authToken', response.data.token);

            alert('Login bem-sucedido!');

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <main className="main-content  mt-0">
            <section>
                <div className="page-header min-vh-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                                <div className="card card-plain bg-white">
                                    <div className="card-header pb-0 text-start">
                                        <h4 className="font-weight-bolder">Entrar no sistema</h4>
                                        <p className="mb-0">Informe seu email e senha para entrar</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <input type="email" className="form-control form-control-lg"
                                                   placeholder="Email"
                                                   aria-label="Email"
                                                   value={email}
                                                   onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="form-control form-control-lg"
                                                   placeholder="Senha"
                                                   aria-label="Password" value={password}
                                                   onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        {/*<div className="form-check form-switch">*/}
                                        {/*    <input className="form-check-input" type="checkbox" id="rememberMe"/>*/}
                                        {/*    <label className="form-check-label" htmlFor="rememberMe">Remember*/}
                                        {/*        me</label>*/}
                                        {/*</div>*/}
                                        <div className="text-center">
                                            <button type="button"
                                                    onClick={handleLogin}
                                                    className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Entrar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-4 text-sm mx-auto">
                                            Ainda não tem conta?
                                            <Link to="/register"
                                                  className="text-primary text-gradient font-weight-bold"> Se cadastre
                                                aqui</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                <div
                                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                                    style={{
                                        backgroundImage: "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')",
                                        backgroundSize: "cover",
                                    }}>
                                    <span className="mask bg-gradient-primary opacity-6"></span>
                                    <h4 className="mt-5 text-white font-weight-bolder position-relative">Gerencie seu
                                        condomínio</h4>
                                    <p className="text-white position-relative">Quanto mais natural a escrita parece,
                                        mais esforço o escritor realmente dedicou ao processo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    form: {
        width: '300px',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '10px',
    },
};

export default Login;