# Express MagicLink sign in 

## Dependencies used:

- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- nodemailer
- uuid
- validator

## To start:

- Clone the project
- Run `npm i` from the project's folder
- Create .env file with:

		MONGO=
		JWT_SECRET=
		NODEMAILER_EMAIL=
		NODEMAILER_PASSWORD=

## How it works:

1. User comes 
2. Wants to access user's area 
3. Is asked for the email 
4. Sends email from the client in the body to `/users/enter`
5. Hits `login` function in the `controllers/users.js`
	- We check if email is not provided or invalid --> send response `ok:false`
	- Otherwise we check the DB if this email already exists
		- If user is not found we call `register` function which creates a new user record with uuid for a `MagicLink` prop and executes `send_magic_link` function which send email to the provided email with the link containing generated uuid (the one saved in the user's record).
		- Otherwise if user exists we generate a new uuid, save it into the DB and send via email to the user. 
		- In case user clicked on the link and we receive not just email but the MagicLink inside the body we check the uuid from the link clicked versus uuid we have in the DB for that user and if they match send back the token to the client. At the same time we set the MagivLink to `expired:true` so that it can only be used once for sign in. If MagicLinks are not matching we deny access.
