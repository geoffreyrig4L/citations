"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Forms = {
  username: string;
};

const SignInPage = () => {
  const { register, handleSubmit } = useForm<Forms>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Forms> = (data) =>
    signIn("credentials", {
      username: data.username,
      redirect: false,
    }).then(async ({ ok }: any) => {
      if (ok) {
        router.push("/");
      }
    });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <CardBody>
          <form
            className="p-4 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold">Connexion</h1>
            <p className="text-sm font-thin">
              {"Utiliser votre nom d'utilisateur pour vour connecter"}
            </p>
            <Input
              label="username"
              type="text"
              {...register("username", { required: true })}
            />
            <Button color="secondary" type="submit">
              {" "}
              Connexion !{" "}
            </Button>
            <Link color="foreground" href="#" underline="always">
              Pas encore de compte ?{" "}
            </Link>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignInPage;
