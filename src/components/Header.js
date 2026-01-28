import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
    
    const navigate = useNavigate();

    return (
        <header>
            <div onClick={() => navigate("/", { replace: true }) }>
                <Link to="/">Home</Link>
            </div>
            |
            <div onClick={() => navigate("/check", { replace: true }) }>
                <Link to="/check">TimerTest</Link>
            </div>
            |
            <div onClick={() => navigate("/quick", { replace: true })}>
                <Link to="/quick">QuickTest</Link>
            </div>
            |
            <div onClick={() => navigate("/test", { replace: true })}>
                <Link to="/test">SubmitTest</Link>
            </div>
            |
            <div onClick={() => navigate("/manage", { replace: true })}>
                <Link to="/manage">Manage</Link>
            </div>
            |
            <div onClick={() => navigate("/user", { replace: true })}>
                <Link to="/user">User</Link>
            </div>
        </header>
    );
}