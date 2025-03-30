"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { H2 } from "../typography";
import { useState } from "react";

type QRCodeComponentProps = {
    value: string; // The value to encode in the QR code
};

export default function QRCodeComponent({ value }: QRCodeComponentProps) {
  const [privacyModalOpen, setPrivacyModalOpen] =
    useState(false); // State to control the privacy modal visibility

  const downloadQRCode = () => {
    const qrCodeElement = document.getElementById("qr-code");
    if (!qrCodeElement) return;

    toPng(qrCodeElement)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch((error) => {
        console.error("Failed to download QR code:", error);
      });
  };

  return (
    <div>
      
      <div className="text-center mb-4 flex items-center flex-col gap-2">
        <h1 className="text-2xl font-bold">Your QR Code</h1>
        <p className="text-muted-foreground mb-4">
          Scan the QR code below to check in quickly!
        </p>
        <QRCode 
            id="qr-code"
            value={value} // Pass the value prop to the QRCode component
            size={256} // You can adjust the size as needed
            bgColor={"#ffffff"} // Background color
            fgColor={"#000000"} // Foreground color
            level={"M"} // Error correction level
        />
      <div className="text-sm text-destructive mt-4 max-w-md">
        <p>
          Note: This QR code is unique to you and will be used for check-in.
          Please do not share it with anyone else.
        </p>

       <div
       className={'flex flex-row gap-4 justify-center mt-4'}
       >
          <Button
          variant={'solid'}
          onClick={downloadQRCode}
          >
            Download QR Code
          </Button>
          <Dialog
          open={privacyModalOpen}
          >
            <DialogTrigger asChild>
              <Button
              onClick={() => {
                // Open the privacy modal
                setPrivacyModalOpen(true);
              }}
              >
              Change Privacy Settings
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Update QR Code Privacy</DialogTitle>
              <DialogDescription>
                  You can update the privacy settings for your QR code. 
                  This will determine who can access your medical record when they scan the QR code.

                  <br />
                <br />
                  Note: Changing this setting will generate a new QR code.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
                <H2 className="text-sm text-muted-foreground">
                    Please select your desired privacy setting for the QR code:
                </H2>
               <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="name" />
                    <Label htmlFor="name" className="flex items-center gap-2">
                        View Name
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="DOB" />
                    <Label htmlFor="DOB" className="flex items-center gap-2">
                        View Date of Birth
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="medicalHistory" />
                    <Label htmlFor="medicalHistory" className="flex items-center gap-2">
                        View Medical History
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="allergies" />
                    <Label htmlFor="allergies" className="flex items-center gap-2">
                        View Allergies
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="healthLogs" />
                    <Label htmlFor="healthLogs" className="flex items-center gap-2">
                        View Health Logs (e.g., journal entries, symptoms)
                    </Label>
                </div>
            </div>

            <DialogFooter>
            <Button type="submit"
            onClick={() => {
                setPrivacyModalOpen(false);
            }}
            >Cancel</Button>
            <Button variant={'solid'} type="submit">Save changes</Button>
          </DialogFooter>
            </DialogContent>
          </Dialog>
          
       </div>
      </div>
    </div>
    </div>
  );
}
