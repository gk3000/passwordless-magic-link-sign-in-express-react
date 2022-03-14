const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	}
});
const URL = 'http://localhost:1337/enter/'

const send_magic_link = async (email,link,which) => {
	if(which == 'signup'){
		var subj="Your sign up link",
		body= '<p>Hello friend and welcome to our website. This is your link to confirm your account: '+(URL+email+'/'+link)+ '</p><p>Needless to remind you not to share this link with anyone 🤫</p>'
	}else{
		var subj="Your sign in link",
		body= '<p>Hello friend and welcome back. This is your link to sign in to your account: '+(URL+email+'/'+link)+ '</p><p>Needless to remind you not to share this link with anyone 🤫</p>' }
		const mailOptions = {
			to: email,
			from: process.env.NODEMAILER_EMAIL,
			subject: subj,
			html: body
		}
		try{
			const response = await transport.sendMail(mailOptions)
			console.log('Link sent 📬')
			return({ok:true,message:'email sent'})
		}
		catch( err ){
			console.log("Something didn't work out 😭", err)
			return({ok:false,message:err})
		}
	}

	module.exports = { send_magic_link }