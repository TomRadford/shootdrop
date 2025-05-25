import config from './config'
import sgMail from '@sendgrid/mail'
import logger from './logger'
import Mailgen from 'mailgen'

//Mailgen setup
const mailGenerator = new Mailgen({
	theme: 'cerberus',
	product: {
		name: 'ShootDrop',
		link: 'https://shootdrop.com',
		copyright: 'Your next shoot starts here!',
	},
})

//SendGrid
sgMail.setApiKey(config.SENDGRID_API_KEY)

//Generic mail
const sendMail = async (msg) => {
	try {
		await sgMail.send(msg)
	} catch (e) {
		logger.error(e)
	}
}

//Mail functions
export const sendAccountRequest = async (user) => {
	if (!user) {
		logger.error('User missing for account request mail')
		return
	}
	try {
		const mailgenMessage = {
			body: {
				title: `${user.fullName} has requested account activation on ShootDrop`,
				intro: `<strong>${
					user.fullName
				}</strong> has created an account on ShootDrop with <strong>${
					user.username
				}</strong> which requires activation.
				<br>
				Account created at ${new Date().toString()}
				`,
				signature: `This mailbox isnt monitored`,
			},
		}
		await sendMail({
			to: config.SITE_ADMIN,
			from: {
				email: 'no-reply@shootdrop.com',
				name: 'ShootDrop',
			},
			subject: `${user.fullName} has requested account activation on ShootDrop`,
			text: mailGenerator.generatePlaintext(mailgenMessage),
			html: mailGenerator.generate(mailgenMessage),
		})
	} catch (e) {
		logger.error(e)
		if (e.response) {
			logger.error(e.response.body)
		}
	}
}

export const sendPasswordReset = async (user, token) => {
	if (!user || !token) {
		logger.error('User and token needed for password reset mail')
		return
	}
	try {
		const mailgenMessage = {
			body: {
				title: `Password reset on ShootDrop`,
				intro: `Hi <strong>${user.fullName}</strong>, you've requested a password reset on ShootDrop.
				Please <a href="https://shootdrop.com/restore?token=${token}">click here</a> to login and set a new password.
				<br/>
				You can also copy this into your browser: <strong>https://shootdrop.com/restore?token=${token}</strong>
				<br/>
				This link will expire in 10 minutes.
				`,
				signature: `This mailbox isnt monitored`,
			},
		}
		await sendMail({
			to: user.username,
			from: {
				email: 'no-reply@shootdrop.com',
				name: 'ShootDrop',
			},
			subject: `Password Reset for ${user.fullName}`,
			text: mailGenerator.generatePlaintext(mailgenMessage),
			html: mailGenerator.generate(mailgenMessage),
		})
	} catch (e) {
		logger.error(e)
		if (e.response) {
			logger.error(e.response.body)
		}
	}
}
