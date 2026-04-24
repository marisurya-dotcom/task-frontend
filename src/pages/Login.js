import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "https://task-manager-backend-t3mq.onrender.com/login",
                {
                    email,
                    password
                }
            );

            // store token
            localStorage.setItem("token", res.data.token);

            alert("Login Successful 🚀");

            // go to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.log(error);
            alert("Login Failed ❌");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Login Page</h2>

            <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;