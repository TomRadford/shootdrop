import config from './config'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
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

//SES Client setup
const sesClient = new SESClient({
	region: config.SES_REGION,
	credentials: {
		accessKeyId: config.AWS_ACCESS_KEY_ID,
		secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	},
})

//Generic mail function
const sendMail = async (msg) => {
	// Validate required fields
	if (!msg.to || !msg.from?.email || !msg.subject || (!msg.text && !msg.html)) {
		throw new Error(
			'Missing required email fields: to, from.email, subject, and either text or html'
		)
	}

	try {
		const command = new SendEmailCommand({
			Source: msg.from.email,
			Destination: {
				ToAddresses: Array.isArray(msg.to) ? msg.to : [msg.to],
			},
			Message: {
				Subject: {
					Data: msg.subject,
					Charset: 'UTF-8',
				},
				Body: {
					...(msg.text && {
						Text: {
							Data: msg.text,
							Charset: 'UTF-8',
						},
					}),
					...(msg.html && {
						Html: {
							Data: msg.html,
							Charset: 'UTF-8',
						},
					}),
				},
			},
		})

		await sesClient.send(command)
		logger.info(`Email sent successfully to ${msg.to}`)
	} catch (e) {
		logger.error('Failed to send email:', e)
		throw e
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
				email: config.SES_FROM_EMAIL,
				name: 'ShootDrop',
			},
			subject: `${user.fullName} has requested account activation on ShootDrop`,
			text: mailGenerator.generatePlaintext(mailgenMessage),
			html: mailGenerator.generate(mailgenMessage),
		})
	} catch (e) {
		logger.error('Failed to send account request email:', e)
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
				email: config.SES_FROM_EMAIL,
				name: 'ShootDrop',
			},
			subject: `Password Reset for ${user.fullName}`,
			text: mailGenerator.generatePlaintext(mailgenMessage),
			html: mailGenerator.generate(mailgenMessage),
		})
	} catch (e) {
		logger.error('Failed to send password reset email:', e)
	}
}
