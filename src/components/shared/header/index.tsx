import { Button } from "@/components/ui/button";
import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../dark-mode-btn";
import LogOutBtn from "../logout-btn";
import { getUser } from "@/auth/server";

const Header = async () => {
  const user = await getUser();

  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link href={"/"} className="flex items-end gap-2">
        <Image
          src={"/goatius.png"}
          height={60}
          width={60}
          className="cursor-pointer rounded-full"
          alt="logo"
          priority
        />
        <h1 className="flex flex-col pb-1 text-2xl leading-5 font-semibold">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutBtn />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
