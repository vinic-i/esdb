import React from 'react';
import {createRole} from "../../api/rolesApi";

const RoleForm = () => {
    const [roleName, setRoleName] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newRole = {nome: roleName};
            await createRole(newRole);
            setRoleName('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)}
                   placeholder={"Nome da Role"} required/>
            <button className={"btn btn-primary"} type="submit">Criar role</button>
        </form>

    );
};

export default RoleForm;