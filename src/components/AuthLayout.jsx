import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== true) {
            navigate("/login");
        } else if (!authentication && authStatus === true) {
            navigate("/expenses");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? (
        <div className="flex h-screen w-screen items-center justify-center bg-zinc-950">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        </div>
    ) : <>{children}</>;
}
