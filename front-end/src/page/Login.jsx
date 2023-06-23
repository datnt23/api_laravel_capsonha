import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { actions, useStore } from "../store";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigator = useNavigate();
	const [state, dispatch] = useStore();
	const handleSubmitLogin = async () => {
		try {
			const response = await axios({
				method: "POST",
				url: `${import.meta.env.VITE_LOCAL_HOST}/login`,
				data: {
					email: email,
					password: password,
				},
			});
			if (response.data.success) {
				navigator("/");
				dispatch(actions.setData([response.data.data]));
				localStorage.setItem("token", response.data.data.token);
			} else {
				window.alert(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<li>
				<Link to={"/register"}>Đăng ký</Link>
			</li>
			<h1>Đăng Nhập</h1>
			<div>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button onClick={handleSubmitLogin}>Đăng nhập</button>
		</>
	);
}

export default Login;
