"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const handleError = async (error) => {
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
      alert("Erro: Email não cadastrado");
      break;
    case error.message == "Failed to fetch":
      alert("Erro: Não foi possível conectar ao servidor de autenticação");
      break;
    }
  console.error(error.status, error.code, error.message, error.name);
};

export const SignUp = async (email, password) => {
  let user;
  // while (true) {
  console.log("ini");
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      throw error;
      // continue;
    }
    user = data.user;
    console.log("end");
    // break;
  } catch (error) {
    console.log("teste");
  }
  // if (error) {
  //   await handleError(error);
  //   // continue;
  // }
  // }

  if (user && user.identities.length) {
    if (user.user_metadata.email_verified === false) {
      console.log("confirmar email");
    } else {
      console.log("sign up success:", data);
    }
  } else {
    console.log("user already exists");
  }
};

export const SignIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    await handleError(error);
    return;
  }

  alert("sign in success");
};

export const LogOut = async (e) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    return;
  }

  console.log("sign out success");
};

export const ReAuthenticate = async (email) => {
  await supabase.auth.resend({
    email: email,
    type: "signup",
  });

  console.log("reauthentication success");
};

export const ResetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: '',
  })

  if (error) {
    console.log(error.message);
    return;
  }

  console.log("password reset sent to email:");
};

export const NewPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) {
    console.log(error.message);
    return;
  }

  console.log("password reset success");
};