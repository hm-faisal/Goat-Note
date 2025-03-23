"use client";

import { loginAction, signUpAction } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  type: "login" | "signUp";
};

const AuthForm = ({ type }: Props) => {
  const isLoginForm = type === "login";

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formDate: FormData) => {
    startTransition(async () => {
      const email = formDate.get("email") as string;
      const password = formDate.get("password") as string;

      console.log(email, password);
      let errorMessage, title, description;

      if (isLoginForm) {
        const response = await loginAction(email, password);
        errorMessage = response.errorMessage;
        title = "Logged in";
        description = "You have successfully logged in";
      } else {
        const response = await signUpAction(email, password);
        errorMessage = response.errorMessage;
        title = "Signed up";
        description =
          "You have successfully signed up \n Please, Confirm your email";
      }

      if (!errorMessage) {
        toast.success(title, { description });
        router.replace("/");
      } else {
        toast.error("Error", { description: errorMessage });
        console.log(errorMessage);
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            id="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            id="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Signup"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {" "}
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};
export default AuthForm;
