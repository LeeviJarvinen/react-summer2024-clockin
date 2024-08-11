import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useRoleQuery } from '../slices/usersApiSlice';

const AdminRoute = () => {

    const { data, isLoading, error } = useRoleQuery();

    if (isLoading) return <div>Loading...</div>;

    return data ? <Outlet /> : <Navigate to='/' replace/>
}

export default AdminRoute