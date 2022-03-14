import React from 'react'

const UserEmail = (props) => {
	return (
		<form onSubmit={props.emailSubmit}>
		<input onChange={props.enterEmail} type='email' value={props.userEmail}></input>
		<button>Sign in</button>
		</form>
		)
}

export default UserEmail