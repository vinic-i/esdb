import React, {useEffect} from 'react';
import {deleteRole, getAllRoles} from "../../api/rolesApi";

const RolesList = () => {
    const [roles, setRoles] = React.useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllRoles();
                setRoles(await response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRoles();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteRole(id);
            setRoles(roles.filter((role) => role.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Lista de roles</h2>
            <ul>
                {roles.map((role) => (
                    <li key={role.nome}>
                        {role.name}
                        <button className={'btn btn-primary'} onClick={() => handleDelete(role.id)}></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RolesList;