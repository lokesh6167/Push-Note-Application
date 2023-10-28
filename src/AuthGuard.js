import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    return localStorage.getItem("validuser") ? children : navigate('/');
};

export default AuthGuard;