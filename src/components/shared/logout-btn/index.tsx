"use client";

import { logOutAction } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const LogOutBtn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out", {
        description: "You have been successfully logged out.",
      });
      router.push("/login");
    } else {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <Button
      className="w-24"
      variant={"outline"}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log out"}
    </Button>
  );
};

export default LogOutBtn;
