export const authError = async (error, email = '') => {
  console.log("authError:\n", error);
  switch (true) {
    case error.status == 429:
      let end = error.message.search(" seconds");
      let ini;
      if (error.message[end - 1] === " ") {
        ini = end;
      } else if (error.message[end - 2] === " ") {
        ini = end - 1;
      } else {
        ini = end - 2;
      }

      let time = parseInt(error.message.substring(ini, end)) + 5;
      console.log("esperar: ", time);
      await new Promise((resolve) => setTimeout(resolve, time * 1000));
      break;
    case error.message == "Email not confirmed":
      alert("Erro: Verificar email de confirmação de cadastro");
      ReAuthenticate(email)
      break;
    case error.message == "Failed to fetch":
      alert("Erro: Não foi possível conectar ao servidor de autenticação");
      break;
    }
  console.error(error.status, error.code, error.message, error.name);
};