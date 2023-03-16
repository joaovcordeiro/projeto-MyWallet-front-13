import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function Create() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const o = new URLSearchParams(window.location.search);
  const type = o.get("type");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  function sendRequest(event) {
    event.preventDefault();
    const URL = `${process.env.REACT_APP_API_URL}/registers`;
    const Register = {
      type,
      value: parseFloat(value).toFixed(2),
      description,
    };

    const promise = axios.post(URL, Register, {
      headers: { Authorization: `Bearer ${token}` },
    });

    promise.then((response) => {
      navigate("/registers");
    });
    promise.catch((error) => {
      console.log(error.response.data);
    });
  }

  return (
    <Main>
      <H1>Nova {type === "deposit" ? "entrada" : "saída"}</H1>
      <Form onSubmit={sendRequest}>
        <Input
          className="input"
          type="number"
          placeholder="Valor"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required
        />
        <Input
          className="input"
          type="text"
          placeholder="Descrição"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <Button type="submit">
          Salvar {type === "deposit" ? "entrada" : "saída"}
        </Button>
      </Form>
    </Main>
  );
}

export default Create;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
const H1 = styled.h1`
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #ffffff;
  font-family: "Raleway";
  margin-top: 25px;
  margin-left: 24px;
`;
