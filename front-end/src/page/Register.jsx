import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { actions, useStore } from "../store";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [state, dispatch] = useStore();
	const navigate = useNavigate();
	const handleSubmitRegister = async () => {
		try {
			const response = await axios({
				method: "POST",
				url: `${import.meta.env.VITE_LOCAL_HOST}/register`,
				data: {
					name: name,
					email: email,
					password: password,
					c_password: confirmPassword,
				},
			});
			if (response.data.success) {
				navigate("/");
				dispatch(actions.setData(response.data.data));
				localStorage.setItem("token", response.data.data.token);
			} else {
				window.alert(
					response.data.validation_errors.name ||
						response.data.validation_errors.email ||
						response.data.validation_errors.password ||
						response.data.validation_errors.c_password
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<li>
				<Link to={"/login"}>Đăng nhập</Link>
			</li>
			<h1>Đăng Ký</h1>
			<div>
				<label>Name:</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
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
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			<button onClick={handleSubmitRegister}>Đăng ký</button>
		</>
	);
}

export default Register;
