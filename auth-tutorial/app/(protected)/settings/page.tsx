"use client";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useTransition } from "react";

const SettingsPage = async () => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      settings({
        name: "New Name!",
      });
    });
  };
  return (
    <Card className=" w-[600px]">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">Settings !!</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
