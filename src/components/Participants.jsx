import styled from "styled-components"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function Participants({ pessoa , editOne , deleteOne }){
    return(
        <div>
            <ListParticipants> 
                <SpanName>{pessoa.nome}</SpanName> 
                <SpanEmail>{pessoa.email}</SpanEmail> 
            </ListParticipants>
            <SpanIcon onClick={editOne}>
                <EditIcon />
            </SpanIcon>
            <SpanIcon onClick={deleteOne}>
                <DeleteForeverOutlinedIcon />
            </SpanIcon>
        </div>
       
    )
}

const ListParticipants = styled.span`
width: 400px;
background: white;
border-radius: 5px;
height: 36px;
display: flex;
justify-contet: center;
align-items: center;
margin-top: 5px;
@media (max-width: 820px){
    width: 55.5882355vw;
}

`

const SpanName = styled.span`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 120px;
    @media (max-width: 820px){
        width: 16.4705884vw;
    }
`

const SpanEmail = styled.span`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 285px;
    @media (max-width: 820px){
        width: 39.1176471vw;
    }
`

const SpanIcon = styled.span`
    border-radius: 5px;
    background-color: #CD5888;
    width: 50px;
    margin-left: 5px;
    margin-top: 5px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover{
        transition : 1000ms;
        transform : translateY(-0px);
        background-color: #e9e8e8;
        color: #913175;
        
    }
`