import React, {useState} from 'react';
import UsuarioForm from "../components/usuarios/UsuarioForm";
import UsuarioList from "../components/usuarios/UsuarioList";

const UsuariosPage = () => {
    const [refreshList, setRefreshList] = useState(false);

    const atualizarUsuarios = () => {
        setRefreshList((prev) => !prev);
    };

    return (
        <div>
            <div className="row">
                <div className="col-lg-4">
                    <UsuarioForm atualizarUsuarios={atualizarUsuarios}/>
                </div>
                <div className="col-lg-8">
                    <UsuarioList refreshList={refreshList}/>
                </div>
            </div>
        </div>
    );
};

export default UsuariosPage;
