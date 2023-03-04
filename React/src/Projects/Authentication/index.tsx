import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./style.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
    // sessionStorage.setItem("isLoggedIn", "true");
  };
  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
