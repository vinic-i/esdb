import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {login} from '../../api/loginApi';
import {useNavigate} from 'react-router-dom';
import {useUser} from "../../store/UsuarioContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {userLogin} = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }
        try {
            const response = await login(email, password);
            localStorage.setItem('authToken', response.data.token);
            userLogin(response.data)
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

export default Login;
