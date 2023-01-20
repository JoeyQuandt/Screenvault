import Head from "next/head";
import Layout from "../components/layout";
import { initFirebase } from "../firebase/firebaseApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

export default function Home(props) {
  initFirebase();
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (user) {
    router.push("/");
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={signIn} variant="redButton">
        Get Data
      </Button>
    </>
  );
}