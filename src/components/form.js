'use client'

import { SignUp, SignIn, LogOut, ReAuthenticate, ResetPassword, NewPassword } from "@/services/auth";
import { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    await SignIn(email, password);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    await SignUp(email, password);
    
  };
  const handleReAuthenticate = async (e) => {
    e.preventDefault();
    await ReAuthenticate(email);
  }
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
          Salvar senha
        </button>
        <button type="button" onClick={handleSignUp} className="bg-blue-400 cursor-pointer p-2 rounded">
          Cadastrar
        </button>
        <button type="button" onClick={handleReAuthenticate} className="bg-green-800 cursor-pointer p-2 rounded">
          Autenticar novamente
        </button>
      </form>
      
    </>
  );
}
