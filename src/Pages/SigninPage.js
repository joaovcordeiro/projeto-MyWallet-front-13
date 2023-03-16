import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../Context/UserContext";
import logo from "../assets/MyWallet.svg";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLogin } = useContext(UserContext);
  const Login = {
    email: email,
    password: password,
  };
  const URL = "https://mywalletback-k4vu.onrender.com/sign-in";

  function sendRequest(event) {
    event.preventDefault();
    const promise = axios.post(URL, Login);
    promise.then((response) => {
      setLogin(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      navigate("/registers");
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  }

  return (
    <Main>
      <Image src={logo}></Image>
      <Form onSubmit={sendRequest}>
        <Input
          className="input"
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <Input
          className="input"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
      <LInk to="/sign-up">Primeira vez? Cadastre-se!</LInk>
    </Main>
  );
}
export default Signin;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #9259be;
`;

const Form = styled.form`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 13px;
`;
const Input = styled.input`
  border: none;
  border-radius: 5px;
  width: 326px;
  height: 58px;
  background-color: #ffffff;
  font-size: 20px;
  font-family: "Raleway", sans-serif;
  padding-left: 15px;

  &.input::placeholder {
    font-family: "Raleway", sans-serif;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }
`;
const Image = styled.img`
  width: 147px;
  height: 50px;
`;
const Button = styled.button`
  width: 326px;
  height: 46px;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 36px;
`;
const LInk = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
`;
