import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <h2>Bem-Vindo, {user.displayName}!</h2>
            <p>Email: { user.email }</p>
        </div>
    );
}

export default Dashboard;