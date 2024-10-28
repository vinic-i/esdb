import React, {useState} from 'react';
import CondominioForm from "../components/condominio/CondominioForm";
import CondominioList from "../components/condominio/CondominioList";

const CondominioPage = () => {
    const [refreshList, setRefreshList] = useState(false);

    const handleRefresh = () => {
        setRefreshList(!refreshList);
    };

    return (
        <div className={'row'}>
            <div className="col-lg-4">
                <CondominioForm atualizarCondominios={handleRefresh}/>
            </div>
            <div className="col-lg-8">
                <CondominioList refreshList={refreshList}/>
            </div>
        </div>
    );
};

export default CondominioPage;
