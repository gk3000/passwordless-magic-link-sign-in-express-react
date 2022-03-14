import React, {useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

// spinners import stuff
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;
// end spinners import stuff

export default function Enter(props) {
	let params = useParams();
	let navigate=useNavigate()
	
	useEffect(()=>{
		debugger
		props.signIn(params.email, params.link)
		navigate('/')
	},[])

	return (
		<div>
		<p>Verifying your magic link</p>
		<FadeLoader color={'black'} loading={true} css={override} size={50} />
		</div>
		)
}
