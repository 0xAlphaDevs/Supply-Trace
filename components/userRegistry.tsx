import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { supplyTraceRegistryAbi } from "@/constants/abi/supplyTraceRegistry";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";

interface FormData {
  name: string;
  industry: string;
}

export default function UserRegistry() {
  const { address } = useAccount();
  const router = useRouter();

  const { writeContract, isPending, isSuccess } = useWriteContract();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    industry: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitRequest = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Registering...");
    console.log("Form Data: ", formData);
    writeContract({
      abi: supplyTraceRegistryAbi,
      address: "0x6aEa5211b23d5E87DDCC2BC7DDb04002ce469269",
      functionName: "setUser",
      args: [formData.name, formData.industry],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("User registered successfully");
      router.push("/inventory");
    }
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {isPending ? (
          <div className="flex flex-col items-center justify-center h-40 gap-4">
            <Spinner />
            <p>Registering user ...</p>
          </div>
        ) : (
          <>
            {!isSuccess ? (
              <>
                <DialogHeader>
                  <DialogTitle>Register</DialogTitle>
                  <DialogDescription>
                    Enter you name and industry to get started.
                  </DialogDescription>
                </DialogHeader>
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        className="col-span-3"
                        onChange={handleChange}
                        name="name"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="industry" className="text-right">
                        Industry
                      </Label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        className="col-span-3"
                        onChange={handleChange}
                        name="industry"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitRequest}>Submit</Button>
                  </DialogFooter>
                </form>
              </>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                <p>Registered Successfully</p>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
