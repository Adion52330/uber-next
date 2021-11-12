import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, onAuthStateChanged } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, [router]);
  return (
    <Wrapper>
      <Head>
        <title>Login</title>
      </Head>
      <UberLogo src="https://i.ibb.co/ZMhy8ws/uber-logo.png" />
      <Title>Login to access our features</Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/logo-image.png" />
      <SignInButton onClick={() => signInWithPopup(auth, provider)}>
        Sign In With Google
      </SignInButton>
    </Wrapper>
  );
};

const Wrapper = tw.div`
flex flex-col h-screen w-screen bg-gray-200 p-4
`;

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`;

const HeadImage = tw.img`
    object-contain h-64
`;

const SignInButton = tw.button`
    bg-black text-white font-bold py-4 mt-8 self-center w-full rounded-full hover:bg-gray-900
`;

const Title = tw.div`
    text-center text-5xl font-bold text-gray-500
`;

export default Login;
