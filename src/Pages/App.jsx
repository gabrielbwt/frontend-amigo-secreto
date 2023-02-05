import styled from "styled-components";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Participants from "../components/Participants";
import Popup from "../components/Popup";
import axios from "axios";
import emailjs from '@emailjs/browser';


export default function App(){
    const [visible, setVisible] = useState(false)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [dados, setDados] = useState([])
    const [participanteEmEdicao, setParticipanteEmEdicao] = useState({_id:"", nome:"", email:""})
    
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (firstRender) {
            axios.get(process.env.REACT_APP_API_URL)
                .then(res => {
                setDados(res.data);
            setFirstRender(false);
      })
      .catch(error => {
        console.error(error);
      });
        }
    }, [firstRender]);

    function addParticipant(event){
        event.preventDefault()
        const body = {nome: nome, email: email}
        const promise = axios.post(process.env.REACT_APP_API_URL,body);
        promise.then(() => {
            setFirstRender(true)
            
        })

        promise.catch(() => {
            alert("Tente novamente")
        })

        setNome("")
        setEmail("")
    }

    function deleteAllParticipants (){
        const promisse = axios.delete(process.env.REACT_APP_API_URL);
        promisse.then(()=>{
            setFirstRender(true)
        })
    }
    
    function arrayAleatorio(array){
        let arrayFinal = []
        let arraySec = [...array]
    
        for(let i = 0; i < array.length; i++){
            let arraySemElemento = arraySec.filter(elemento => elemento !== array[i])
            let indiceAleatorio = Math.floor(Math.random()*arraySemElemento.length)
            let [elementoSorteado]= arraySemElemento.splice(indiceAleatorio,1)
            arrayFinal.push(elementoSorteado)
            if(!arrayFinal.includes(array[i])){
                arraySemElemento = [...arraySemElemento,array[i]]
            } 
            arraySec = [...arraySemElemento]
        }

        if (arrayFinal.includes(undefined)) {
            arrayFinal = arrayAleatorio(array)
          } 
        
        return arrayFinal
    } 

    function sortParticipants(){
        if(dados.length > 1){
            let dadosCopia = [ ...dados ]
            dadosCopia = arrayAleatorio(dadosCopia)
            for(let i = 0; i < dados.length; i++){

                let body = {
                    name: dados[i].nome,
                    email: dados[i].email,
                    message: dadosCopia[i].nome
                }

                
               emailjs.send(
                process.env.REACT_APP_SERVICE_ID, 
                process.env.REACT_APP_TEMPLATE_ID, 
                body, 
                process.env.REACT_APP_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            }); 
            } 

            alert("Emails enviados!")
            deleteAllParticipants()
            
        } else{
            alert("Número insuficiente de participantes")
        }
        
        
    }

    function deleteOneParticipant(participant){
            axios.delete(`${process.env.REACT_APP_API_URL}${participant._id}`)
            setFirstRender(true)
        }
    
    function editOneParticipant(participant){
        setParticipanteEmEdicao(participant)    
        setVisible(true)
    }

    return(
        <Container>
                 <Popup 
                    participanteEmEdicao={participanteEmEdicao}
                    setParticipanteEmEdicao={setParticipanteEmEdicao}
                    visible={visible} 
                    setVisible={setVisible}
                    dados={dados}
                    setDados={setDados}
                    setFirstRender={setFirstRender}
                    />
            <Menu>
                <h1>Sorteador de Amigo Secreto</h1>
                <div>
                    <form onSubmit={addParticipant}>
                    
                    <TextField 
                        id="outlined-basic" 
                        label="Nome" 
                        variant="outlined" 
                        type="text" 
                        value={nome} 
                        onChange={e => setNome(e.target.value)}
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
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required
                        color="secondary"
                        sx=
                        {{
                            marginTop: 0.5,
                            marginBottom: 1,
                            marginLeft: 1,
                            marginRight: 1
                        }}/>
                        
	                <button type="submit">Adicionar Participante</button>
	                </form>
                </div>
                <Main>
                    <Header>
                        <SpanName>Nome</SpanName>  
                        <SpanEmail>Email</SpanEmail> 
                        <SpanOpcoes>Opções</SpanOpcoes>
                    </Header> 
                <ListParticipants>
                    { dados.map((pessoa) => 
                    <Participants 
                        key={pessoa._id} 
                        pessoa={pessoa} 
                        deleteOne={() => (deleteOneParticipant(pessoa))} 
                        editOne={() => (editOneParticipant(pessoa))}
                        /> 
                    )}
                </ListParticipants>
                </Main>
                <FinishMenu>
                         <button onClick={sortParticipants}>Sortear os Amigos</button>
                         <button onClick={deleteAllParticipants}>Começar do zero</button>
                </FinishMenu>
                        
            </Menu>
        </Container>
    )
}

const Container = styled.div`
background: rgb(32,38,46);
height: 100vh;
min-height: 900px;
display: flex;
align-items: center;
justify-content: center;
button{
    font-family: Roboto, sans-serif;
    font-weight: 0;
    font-size: 16px;
    color: #e9e8e8;
    background-color: #913175;
    padding: 10px 30px;
    border: solid #913175 2px;
    box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
    border-radius: 50px;
    transition : 1000ms;
    transform: translateY(0);
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}
button:hover{
    transition : 1000ms;
    /*padding: 10px 50px;*/
    transform : translateY(-0px);
    background-color: #e9e8e8;
    color: #913175;
    border: solid 2px #913175;
}
@media (max-width: 820px){
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    }
`

const Menu = styled.div`
background: #E9E8E8;
position: relative;
width: 80vw;
min-width: 772px;
height: 760px;
@media (max-width: 820px){
    width: 90vw; 
    min-width: 90vw;
    }
border-radius: 20px;
-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
h1{
    padding-top: 10px;
    font-size: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 60px;
    margin-bottom: 20px;
    margin-top: 20px;
    @media (max-width: 820px){
        font-size: 30px;
        width: 100%;
        }
}
form{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    @media (max-width: 820px){
        flex-direction: column;
        height: 150px;
        width: 100%;
        }

    input{
        
    }
    
}
`

const ListParticipants = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content:start;
    height: 430px;
    @media (max-width: 820px){
            height: 270px;
        }
    overflow-y: scroll ;
    ::-webkit-scrollbar {
        display: none;
      }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    
    div{
        display:flex;
        align-items: center;
        justify-content: start;
        height: 36px;
        margin-bottom: 5px;
        @media (max-width: 820px){
            width: 70vw;
        }
    }
`

const Main = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin-top: 35px;
@media (max-width: 820px){
    width: 100%;
    }


`

const SpanName = styled.span`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 120px;
    @media (max-width: 820px){
    width: 23.529412%;
    }
    
`

const SpanEmail = styled.span`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 285px;
    @media (max-width: 820px){
    width: 55.882353%;
    }
`

const FinishMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
	margin: auto;
    left: 0;
    right: 0;
    bottom: 15px;
    button{
        margin: 5px;
        @media (max-width: 820px){
            width: 140px;
        }
    }
`

const Header = styled.div`
color: white;
width: 510px;
background: #913175;
border-radius: 5px;
height: 36px;
display: flex;
justify-contet: center;
align-items: center;
margin-bottom: 5px;
@media (max-width: 820px){
    width: 70vw;
}

`

const SpanOpcoes = styled.span`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 105px;
    @media (max-width: 820px){
    width: 20.588235%;
    }
`;