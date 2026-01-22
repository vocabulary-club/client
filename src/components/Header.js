import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
    
    const navigate = useNavigate();

    return (
        <header>
            <div>
                <button onClick={() => navigate("/", { replace: true }) }>
                    <Link to="/">Home</Link>
                </button>
                <button onClick={() => navigate("/user", { replace: true }) }>
                    <Link to="/user">User</Link>
                </button>
                <button onClick={() => navigate("/join", { replace: true })}>
                    <Link to="/join">Join</Link>
                </button>
            </div>            
        </header>
    );
}