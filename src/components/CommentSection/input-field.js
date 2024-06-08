import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
width:100%;
position:relative;
`

const TextArea = styled.textarea`
width: 100%;
height: 300px;
max-height:60px;
background-color: white;
padding: 14px 14px 30px 14px;
border-radius: 17px;
transition: height .3s;
overflow: hidden;
resize: none;
position: relative;
outline: none;
border: none;
transition: max-height 0.3s;
z-index: 2;
padding-bottom: 4rem;
scroll-padding: 4rem;
&:focus{
    max-height:300px;
    outline:2px solid var(--main-color);
}

&:focus + button {
    opacity:1;
}
`
const SubmitButton = styled.button`
opacity:0;
z-index:2;
bottom:1rem;
right:1rem;
color:white;
overflow: hidden;
position:absolute;
width:fit-content;
padding:.3rem 1rem;
border-radius: 3000px;
background:var(--main-color);
transition: opacity .3s;
transition-delay: .3s;
`

export default function InputField({setCommentsReplies, setCommentsRepliesCount}){
    const { id } = useParams()    
    const [cookies, setCookies] = useCookies();
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    function handleFormSubmit(e){
        e.preventDefault();

        if (!cookies.token){
            navigate('/login');
        }

        const formData = new FormData(e.currentTarget);
        let text = formData.get('text')?.trim();

        if (text&& text.length > 0){
            console.log(text)
            requestCreateComment(text,id)
        }
    }

    async function requestCreateComment(text,movieID){
        setIsLoading(true);

        const URL =`${process.env.REACT_APP_API_URL}/api/comments/`;
        const payload = {
            text : text,
            movie : movieID,
        }
        const INIT = {
            method:"POST",
            body : JSON.stringify(payload),
            headers : {
                'Authorization' : "Token " + cookies.token,
                'content-type' :'application/json'
            }
        }

        const request = await fetch(URL,INIT);
        const response = await request.json();

        if(request?.status == 201){
            setCommentsReplies((prev) => {return [response.data.comment, ...prev]});
            setCommentsRepliesCount(response.metadata.comments_replies_count)
        }

        if(request?.status == 401){
            navigate('/login')
        }

        setIsLoading(false);
    }

    return(
        <Form onSubmit={handleFormSubmit}>
            <TextArea name="text" placeholder="New comment..."/>
            <SubmitButton type='submit'>Comment</SubmitButton>
        </Form>
    )
}