import React, { useState, ChangeEvent, FormEvent } from "react";
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

interface FormData {
  name: string;
  industry: string;
}

export function UserMetadata({ setRecheckUser }: { setRecheckUser: any }) {
  const { address } = useAccount();
  const { writeContract } = useWriteContract()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    industry: "",
  });



  const constructUser = (name: string, industry: string) => {
    const newUser = {
      name: name,
      industry: industry,
    };
    return newUser;
  };

  async function createUser() {
    try {
      const newUser = constructUser(
        formData.name,
        formData.industry
      );
      console.log(" Data: ", formData);
      // TO DO: call register function from smart contract
      write({
        args: [newUser.name, newUser.industry,],
      });
      setTimeout(() => {
        setRecheckUser((prev: boolean) => !prev);
      }, 2000);
    } catch (error) {
      console.error("Error submitting metaData:", error);
    }
  }

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
    await createUser();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-4">
            <p>Registering user...</p>
          </div>
        ) : (
          <>
            {!isSuccess ? (
              <>
                <DialogHeader>
                  <DialogTitle>Enter Details</DialogTitle>
                  <DialogDescription>
                    Register your details here to access the EtherGigs.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitRequest}>
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
                    <Button type="submit">Submit</Button>
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