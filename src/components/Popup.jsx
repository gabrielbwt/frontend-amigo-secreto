import styled from "styled-components"
import TextField from '@mui/material/TextField';
import axios from "axios";

export default function Popup({ participanteEmEdicao, setParticipanteEmEdicao,  visible , setVisible , setFirstRender }){

    
    function atualizarDados(){
        const body = {nome: participanteEmEdicao.nome, email: participanteEmEdicao.email}
        const promise = axios.put(`http://localhost:4000/${participanteEmEdicao._id}`, body);
        promise.then(() => {
            setVisible(false)
            setFirstRender(true)
        })
    }

    return(
        <Container status={visible}>
            <h1>Alterar dados</h1>
            <Inputs>
            <TextField 
                id="outlined-basic" 
                label="Nome" 
                variant="outlined" 
                type="text" 
                value={participanteEmEdicao.nome} 
                onChange={e => setParticipanteEmEdicao(
                    {
                        ...participanteEmEdicao,
                        nome: e.target.value
                    }
                )}
                required
                color="secondary"
                sx={{
                    marginTop: 0.5,
                    marginBottom: 0.5,
                    marginLeft: 1,
                    marginRight: 1
                }}/>

            <TextField              
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                type="email" 
                value={participanteEmEdicao.email} 
                onChange={e => setParticipanteEmEdicao(
                    {
                        ...participanteEmEdicao,
                        email: e.target.value
                    }
                )}
                required
                color="secondary"
                sx={{
                    marginTop: 0.5,
                    marginBottom: 0.5,
                    marginLeft: 1,
                    marginRight: 1
                }}/>

            </Inputs>
            <Buttons>
                <button onClick={atualizarDados}> Atualizar </button>
                <button onClick={() => setVisible(false)}> Cancelar </button>
            </Buttons>
            

        </Container>
    )
}

const Container = styled.div`
    width: 50vw;
    height: 35vh;
    background-color: #E9E8E8;
    position: fixed;
    z-index: 100;
    border: 1px solid black;
    border-radius: 20px;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
    display: ${props => props.status ? "block" : "none"}; 
    

    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10vh;
    }
   
`;

const Inputs = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 820px){
    flex-direction: column;
    }

`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    button{
        margin: 15px;
    }
    @media (max-width: 820px){
    margin-top: 0;
    }
    
`;