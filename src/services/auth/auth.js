"use client";

import { createClient } from "@supabase/supabase-js";
import { authSignUp} from "@/services/auth/authSignUp";
import { authError } from "@/services/auth/authError";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const tokenTime = 300; // 5 minutes
const timeZone = -3 * 1000 * 60 * 60; // UTC-3

export const SignUp = async (email, password) => {
  await authSignUp(email, password);
};

export const SignIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    await authError(error, email);
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

  console.log("reauthentication sent");
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