import React, {useState} from 'react';
import CondominioForm from "../components/condominio/CondominioForm";
import CondominioList from "../components/condominio/CondominioList";
import {useUser} from "../store/UsuarioContext";

const CondominioPage = () => {
    const [refreshList, setRefreshList] = useState(false);
    const {user} = useUser();
    console.log(user)
    const handleRefresh = () => {
        setRefreshList(!refreshList);
    };

    return (
        <div>
            {user && user.role === 'ADMIN' ? (
                <div className='row'>
                    <h3 className='text-white'>Cadastrar condomínio</h3>
                    <div className="col-lg-4 mb-3">
                        <CondominioForm atualizarCondominios={handleRefresh}/>
                    </div>
                    <div className="col-lg-8">
                        <CondominioList refreshList={refreshList}/>
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className='text-white'>Seus condomínios</h3>
                    <CondominioList refreshList={refreshList}/>
                </div>
            )}
        </div>
    )
        ;

};

export default CondominioPage;
