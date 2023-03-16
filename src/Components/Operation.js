import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Operation({ operation, authorization, callback }) {
  const { description, type, date, value, operationId } = operation;
  const token = authorization;
  const URL = `${process.env.REACT_APP_API_URL}/registers`;
  const navigate = useNavigate();

  function HandleDelete() {
    const id = {
      id: operationId,
    };
    const verification = window.confirm(
      "Deseja realmente excluir este registro?"
    );

    if (verification) {
      const promisse = axios.delete(URL, {
        data: id,
        headers: { Authorization: `Bearer ${token}` },
      });
      promisse.then((response) => {
        callback();
      });
      promisse.catch((error) => {
        console.log(error.response.data);
      });
    }
  }

  function HandleClick() {
    navigate(`/edit/?id=${operationId}&type=${type}`);
  }

  return (
    <OperationContainer>
      <Div>
        <OperationDate>{date}</OperationDate>
        <OperationDescription onClick={HandleClick}>
          {description}
        </OperationDescription>
      </Div>
      <Div classname="direita">
        <OperationValue color={type === "deposit" ? "#6FC341" : "#C94111"}>
          {parseFloat(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </OperationValue>
        <DeleteOperation onClick={HandleDelete}>x</DeleteOperation>
      </Div>
    </OperationContainer>
  );
}

export default Operation;

const OperationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
`;
const OperationDate = styled.p`
  font-family: "Raleway";
  font-size: 16px;
  line-height: 19px;
  color: #c6c6c6;
`;
const OperationDescription = styled.p`
  font-family: "Raleway";
  font-size: 16px;
  line-height: 19px;
  margin-left: 10px;
  color: #000000;
`;
const OperationValue = styled.p`
  font-family: "Raleway";
  font-size: 16px;
  line-height: 19px;
  margin-right: 11px;
  color: ${(props) => props.color};
`;
const DeleteOperation = styled.p`
  font-family: "Raleway";
  font-size: 16px;
  line-height: 19px;
  color: #c6c6c6;
  cursor: pointer;
`;
const Div = styled.div`
  display: flex;
`;
