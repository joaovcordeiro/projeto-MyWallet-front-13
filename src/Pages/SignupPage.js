import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from '../assets/MyWallet.svg';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const Register = {
        name: name,
        email: email,
        password: password,
        confirmationPassword: confirmPassword
    };
    const URL = 'http://localhost:5000/sign-up';

    function sendRequest(event) {
        event.preventDefault();
        console.log(Register);
        const promise = axios.post(URL, Register);
        promise.then(response => {
            navigate('/');
        })
        promise.catch(error => {
            alert(error.response.data);
        })
    }

    return (
        <Main>
            <Image src={logo}></Image>
            <Form onSubmit={sendRequest}>
                <Input
                    className="input"
                    type="name"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
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
                <Input
                    className="input"
                    type="password"
                    placeholder="Confirme a senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                />
                <Button type='submit'>Cadastrar</Button>
            </Form>
            <LInk to="/" >Já tem uma conta? Entre agora!</LInk>
        </Main>
    );
}
export default Signup;

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #9259BE;
`

const Form = styled.form`
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    gap: 13px;   
`
const Input = styled.input`
    
    border: none;
    border-radius: 5px;
    width: 326px;
    height: 58px;
    background-color: #FFFFFF;
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
    padding-left: 15px;

    &.input::placeholder {
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }
`
const Image = styled.img`
    width: 147px;
    height: 50px;
`
const Button = styled.button`
    width: 326px;
    height: 46px;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 36px;
`
const LInk = styled(Link)`
    text-decoration: none;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;`

