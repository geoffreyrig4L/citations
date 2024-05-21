"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type Forms = {
  username: string;
};

const signUp = async (username: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = await response.json();

  return data;
};

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<Forms>();
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const onSubmit: SubmitHandler<Forms> = (data) =>
    signUp(data.username)
      .then(() => {
        setIsError(false);
        signIn("credentials", {
          username: data.username,
          redirect: false,
        }).then(async ({ ok }: any) => {
          if (ok) {
            router.push("/");
          }
        });
      })
      .catch(() => {
        setIsError(true);
      });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <CardBody>
          <form
            className="p-4 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold">Creer un compte</h1>
            <p className="text-sm font-thin">
              {"Utiliser votre nom d'utilisateur pour vour connecter"}
            </p>
            <Input
              label="username"
              type="text"
              {...register("username", { required: true })}
            />
            {isError && (
              <p className="text-danger font-thin">
                {"Ce nom d'utilisateur existe déjà"}
              </p>
            )}
            <Button color="secondary" type="submit">
              {" "}
              Creer un compte !{" "}
            </Button>
            <Link className="underline" href="signIn">
              Déjà inscrit ?{" "}
            </Link>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpPage;
