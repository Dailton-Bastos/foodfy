import Mail from '../../libs/Mail';

class SendPasswordMail {
  get key() {
    return 'SendPasswordMail';
  }

  async handle({ data }) {
    const { name, email, password } = data;

    await Mail.sendMail({
      to: `${name} < ${email} >`,
      subject: 'Código de acesso Foodfy',
      template: 'send_password',
      context: {
        user: name,
        password,
      },
    });
  }
}

export default new SendPasswordMail();
