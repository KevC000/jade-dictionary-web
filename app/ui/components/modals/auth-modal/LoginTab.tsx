"use client";
import {
  Button,
  Center,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
  Text,
} from "@mantine/core";
import React, { ServerContextJSONValue, useContext, useState } from "react";
import { useForm } from "@mantine/form";
import {
  FirebaseContext,
  useFirebaseContext,
} from "@/app/providers/FirebaseProvider";
import { modals } from "@mantine/modals";
import classes from "./AuthModal.module.css";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

type Props = {};

const LoginTab = (props: Props) => {
  const firebase = useFirebaseContext();

  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const signIn = async () => {
    const { email, password } = form.values;

    try {
      // Set session persistence based on remember me checkbox
      const persistenceType = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(firebase.auth, persistenceType);

      const result = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      modals.closeAll();
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <>
      <form>
        <TextInput
          className="mb-2"
          required
          label="Email"
          placeholder="johndoe123@gmail.com"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
        />
        <PasswordInput
          className="my-2"
          required
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          radius="md"
        />
        <Center>
          <Text size="sm" color="red">
            {errorMessage}
          </Text>
        </Center>
        <Checkbox
          className="jadeCheckbox my-1"
          label="Remember me"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.currentTarget.checked)}
        />
        <Button
          className={`${classes.jadeButtons} my-2`}
          onClick={signIn}
          fullWidth
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginTab;
