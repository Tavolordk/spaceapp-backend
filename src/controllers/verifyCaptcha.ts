import axios from 'axios';

export const verifyCaptcha = async (token: string): Promise<boolean> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: token
        }
      }
    );

    const data = response.data;
    return data.success && data.score > 0.5; // score mínimo recomendable
  } catch (error) {
    console.error('❌ Error verificando reCAPTCHA:', error);
    return false;
  }
};
