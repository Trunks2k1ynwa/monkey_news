import React from 'react';
import Table from 'components/table/Table.js';

const UserTable = () => {
    return (
        <div>
            <Table>
                <thead>
                    <th>ID</th>
                    <th>Info</th>
                    <th>Username</th>
                    <th>Email address</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Action</th>
                </thead>
            </Table>
        </div>
    );
};

export default UserTable;