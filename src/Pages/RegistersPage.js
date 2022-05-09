import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../Context/UserContext';
import logOut from '../assets/Vector.svg';
import remove from '../assets/minus.svg';
import add from '../assets/plus.svg';
import Operation from '../Components/Operation';

function Registers() {
    const navigate = useNavigate();
    const [registers, setRegisters] = useState([]);
    const [pageState, setPageState] = useState('');
    const { login } = useContext(UserContext);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const [updatePage, setUpdatePage] = useState(false);
    let saldo = 0;
    const URL = 'http://localhost:5000/registers';

    function HandleDeposit() {
        navigate(`/create/?type=deposit`);
    }

    function HandleWithdraw() {
        navigate(`/create/?type=withdraw`);
    }
    function LogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    useEffect(() => {
        const promise = axios.get(URL,
            { headers: { Authorization: `Bearer ${token}` } });

        promise.then(response => {
            setRegisters(response.data);
            response.data.length === 0 ? setPageState('empty') : setPageState('full');

        })
        promise.catch(error => {
            alert(error.response.data);
        })
    }, [updatePage]);

    registers.forEach(register => {
        if (register.type === 'deposit') {
            saldo += parseFloat(register.value);
        }
        else {
            saldo -= parseFloat(register.value);
        }
    })

    return (
        pageState === 'empty'
            ?
            <Main>
                <H1>Olá, {user}</H1>
                <Image className='logout' src={logOut} onClick={LogOut}></Image>
                <Div className='no-registers'>
                    <P>Não há registros de entrada ou saída</P>
                </Div>
                <div>
                    <Button className='deposit' onClick={HandleDeposit}><Image src={add}></Image><P className='add'>Nova<br></br> entrada</P></Button>
                    <Button className='withdraw' onClick={HandleWithdraw}><Image src={remove}></Image><P className='add'>Nova<br></br> saída</P></Button>
                </div>
            </Main>
            :
            <Main>
                <H1>Olá, {user}</H1>
                <Image className='logout' src={logOut} onClick={LogOut}></Image>
                <Div>
                    {registers.map(register => {
                        return (
                            <Operation key={register.operationId} operation={register} authorization={token} callback={() => setUpdatePage(!updatePage)} />
                        )
                    })}
                    <BalanceContainer>
                        <P className='balance'>SALDO</P>
                        <P className='balance-value' color={saldo > 0 ? '#6FC341' : '#C94111'}>{saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</P>
                    </BalanceContainer>
                </Div>
                <div>
                    <Button className='deposit' onClick={HandleDeposit}> <Image src={add}></Image><P className='add'>Nova<br></br> entrada</P></Button>
                    <Button className='withdraw' onClick={HandleWithdraw}><Image src={remove}></Image><P className='add'>Nova<br></br> saída</P></Button>
                </div>
            </Main>
    );
}
export default Registers;

const Main = styled.main`
    position: relative;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #9259BE;
    font-family: "Raleway", "sans-serif";
`
const P = styled.p`
    width: 180px;
    height: 46px;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    &.balance {
        position: absolute;
        left: -50px;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }
    &.balance-value {
        position: absolute;
        right: -30px;
        font-size: 17px;
        line-height: 20px;
        color: ${props => props.color};
    }
    
    &.add{
        width: 64px;
        height: 40px;
        text-align: left;
        position: absolute;
        color: #FFFFFF;
        left: 10px;
        bottom: 9px;
    }

`
const H1 = styled.h1`
    position: absolute;
    top: 25px;
    left: 24px;
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    color: #FFFFFF;
`
const Div = styled.div`
    position: absolute;
    top: 78px;
    left: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 326px;
    height: 446px;
    background-color: #FFFFFF;
    border-radius: 5px;
    overflow: scroll;
    padding-top: 15px;
    padding-bottom: 45px;
    &.no-registers {
        display: flex;
        justify-content: center;
    }
`
const Button = styled.button`
    position: absolute;
    width: 155px;
    height: 114px;
    background-color: #A328D6;
    bottom: 16px;
    border-radius: 5px;
    border: none;
    color: #FFFFFF;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;

    &.deposit {
        left: 25px;
    }
    &.withdraw {
        right: 24px;
    }
`
const BalanceContainer = styled.div`
    position: fixed;
    bottom: 143px;
    width: 326px;
    background-color: #FFFFFF;
    height: 30px;
    display: flex;
    border-radius: 5px;
`
const Image = styled.img`
    position: absolute;
    font-size: 30px;
    top: 9px;
    left: 8px;
    &.logout {
        top: 28px;
        right: 24px;
        left: auto;
    }
    
`



