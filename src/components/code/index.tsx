"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";

type QRCodeComponentProps = {
    value: string; // The value to encode in the QR code
};

export default function QRCodeComponent({ value }: QRCodeComponentProps) {
  
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
              Change Privacy Settings
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
            </DialogContent>
          </Dialog>
          
       </div>
      </div>
    </div>
    </div>
  );
}
