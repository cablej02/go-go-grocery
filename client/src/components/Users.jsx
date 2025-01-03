import React from 'react';

const UserList = ({ user }) => {
    return (
        <>
            <h2 className="pb-5">
                Show the first user
            </h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{user.id}</h5>
                    <h5 className="card-title">{user.email}</h5>
                </div>
            </div>
        </>
    );
};

export default UserList;
