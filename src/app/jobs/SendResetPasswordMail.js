import Mail from '../../libs/Mail';

class SendResetPasswordMail {
  get key() {
    return 'SendResetPasswordMail';
  }

  async handle({ data }) {
    const { name, email, token } = data;

    await Mail.sendMail({
      to: `${name} < ${email} >`,
      subject: 'Recuperação de senha Foodfy',
      template: 'send_reset_password',
      context: {
        user: name,
        token,
      },
    });
  }
}

export default new SendResetPasswordMail();
