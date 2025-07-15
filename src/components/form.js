'use client'

import { SignUp, SignIn, LogOut, ResetPassword, NewPassword } from "@/services/auth/auth";
import { useState } from "react";
import RequestProcessing from "./requests/request-processing";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const passwordValidation = (password) => {
    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    return true;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!passwordValidation(password)) {
      return;
    }
    await SignIn(email, password);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!passwordValidation(password)) {
      return;
    }
    await SignUp(email, password);
    
  };
    const handleResetPassword = async (e) => {
    e.preventDefault();
    await ResetPassword(email);
  }
  const handleNewPassword = async (e) => {
    e.preventDefault();
    await NewPassword(password);
  }
  const handleLogOut = async (e) => {
    e.preventDefault();
    await LogOut();
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const openQueue = (e) => {
    e.preventDefault();
    setIsHidden(false);
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold">Form</h1>
      <form className="m-2 flex flex-col gap-2 w-1/4 mx-auto">
        <input type="text" placeholder="Email" onChange={handleChangeEmail} className="border-2 border-gray-300 p-2 rounded" required />
        <input type="password" placeholder="Senha" onChange={handleChangePassword} className="border-2 border-gray-300 p-2 rounded" required />
        <button type="button" onClick={handleSignIn} className="bg-green-600 cursor-pointer p-2 rounded">
          Login
        </button>
        <button type="button" onClick={handleLogOut} className="bg-red-400 cursor-pointer p-2 rounded">
          Sair
        </button>
        <button type="button" onClick={handleResetPassword} className="bg-yellow-400 cursor-pointer p-2 rounded">
          Esqueci minha senha
        </button>
        <button type="button" onClick={handleNewPassword} className="bg-yellow-800 cursor-pointer p-2 rounded">
          Redefinir senha
        </button>
        <button type="button" onClick={handleSignUp} className="bg-blue-400 cursor-pointer p-2 rounded">
          Cadastrar
        </button>
        <button type="button" onClick={openQueue} className="bg-gray-400 cursor-pointer p-2 rounded">
          Processar fila
        </button>
      <RequestProcessing hidden={isHidden} user_id={'teste'} request_id={''}/>
      </form>
    </>
  );
}
