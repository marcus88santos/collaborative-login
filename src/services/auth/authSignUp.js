import CryptoJS from 'crypto-js'

import { authError } from "@/services/auth/authError";
import { enqueueRequest } from '@/services/enqueue-request/enqueueRequest';

export const authSignUp = async (email, password) => {
    
    console.log("ini signup");
    // TESTE DE FILA
    
    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString()

    enqueueRequest(
        null,
        'signup',
        {
            email,
            password: encryptedPassword
        }
    );

    // TESTE DE FILA

    console.log("fim signup");
  
    /*
  let user;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });



    if (error) {
      await authError(error, email);
      return
    }

    user = data.user;
    console.log("end");
    
  } catch (error) {
    console.log("erro");
    if (error) {
      await authError(error, email);
      return
    }
  }

  if (user && user.identities.length === 0) {
    alert("Erro: Usuário já cadastrado");
    return
  }

  const lastConfirmation = new Date(user.confirmation_sent_at)
  const dateNow = new Date()
  
  const intervalConfirmation = (dateNow + timeZone - lastConfirmation)/1000;

  if (user && user.identities.length > 0 && intervalConfirmation < tokenTime) {
    alert("Por favor, verifique sua caixa de entrada e clique no link de confirmação para concluir o cadastro.\nSe você não recebeu o email, aguarde " + (Math.round(tokenTime - intervalConfirmation) + 1) + " seg e tente novamente.");
    return
  }

  alert("Um novo email de confirmação será enviado para " + email + " em instantes.\nPor favor, verifique sua caixa de entrada e clique no link de confirmação para concluir o cadastro.");
  setInterval(() => {
    ReAuthenticate(email);
  }, 61 * 1000);

  */
};