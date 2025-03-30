"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { H2 } from "../typography";
import { useState } from "react";
import type { QRCode as QRCodeModel } from "@prisma/client";
import { updateQrCodePrivacy } from "@/backend/qr-code";
import { useRouter } from "next/navigation";

type QRCodeComponentProps = {
    value: QRCodeModel; // The value to encode in the QR code
    link: string; // The link to navigate to when the QR code is scanned
    allowEditing?: boolean; // Optional prop to control if the QR code can be edited
};

export default function QRCodeComponent({ link, value, allowEditing = false }: QRCodeComponentProps) {
  const router = useRouter(); // Use the Next.js router for navigation
    const [privacyModalOpen, setPrivacyModalOpen] =
    useState(false); // State to control the privacy modal visibility

    const [privacySettings, setPrivacySettings] = useState({
      name: value.shareName,
      DOB: value.shareDateOfBirth,
      medicalHistory: value.shareMedicalHistory,
      allergies: value.shareAllergies,
      healthLogs: value.shareHealthLogs,
    });

    const updateQrCode = () => {
        updateQrCodePrivacy(value.id, {
            // Call the backend function to update the QR code privacy settings
            allergies: privacySettings.allergies,
            medicalHistory: privacySettings.medicalHistory,
            name: privacySettings.name,
            dateOfBirth: privacySettings.DOB,
            shareHealthLogs: privacySettings.healthLogs
        }).then((updatedQrCode) => {
            // Handle the updated QR code response if needed
            router.push("/code");
        }).catch((error) => {
            console.error("Failed to update QR code privacy settings:", error);
        })
    }

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
            value={link} // Pass the value prop to the QRCode component
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
          variant={'default'}
          onClick={downloadQRCode}
          >
            Download QR Code
          </Button>

          {
            allowEditing &&
          
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
                <Switch name="name" 
                checked={privacySettings.name} // This is optional, but can be used to set the initial state
                onCheckedChange={value => {
                    // Update the privacy settings state
                    setPrivacySettings((prev) => ({
                        ...prev,
                        name: value, // Convert to boolean
                    }));
                }}
                />
                    <Label htmlFor="name" className="flex items-center gap-2">
                        View Name
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="DOB" 
                checked={privacySettings.DOB} // This is optional, but can be used to set the initial state
                onCheckedChange={value => {
                    // Update the privacy settings state
                    setPrivacySettings((prev) => ({
                        ...prev,
                        DOB: value, // Convert to boolean
                    }));
                }}
                />
                    <Label htmlFor="DOB" className="flex items-center gap-2">
                        View Date of Birth
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="medicalHistory" 
                 checked={privacySettings.medicalHistory} // This is optional, but can be used to set the initial state
                 onCheckedChange={value => {
                     // Update the privacy settings state
                     setPrivacySettings((prev) => ({
                         ...prev,
                         medicalHistory: value, // Convert to boolean
                     }));
                 }}
                />
                    <Label htmlFor="medicalHistory" className="flex items-center gap-2">
                        View Medical History
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="allergies"
                 checked={privacySettings.allergies} // This is optional, but can be used to set the initial state
                 onCheckedChange={value => {
                     // Update the privacy settings state
                     setPrivacySettings((prev) => ({
                         ...prev,
                         allergies: value, // Convert to boolean
                     }));
                 }}
                />
                    <Label htmlFor="allergies" className="flex items-center gap-2">
                        View Allergies
                    </Label>
                </div>

                <div className="mt-2 flex flex-row items-center gap-2">
                <Switch name="healthLogs"
                 checked={privacySettings.healthLogs} // This is optional, but can be used to set the initial state
                 onCheckedChange={value => {
                     // Update the privacy settings state
                     setPrivacySettings((prev) => ({
                         ...prev,
                         healthLogs: value, // Convert to boolean
                     }));
                 }}
                />
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
            <Button variant={'solid'} 
            onClick={() => {
                // Here you would typically handle the logic to update the QR code with new privacy settings
                // For example, you might want to call an API to update the QR code data based on the new settings
                // For now, just close the modal
                setPrivacyModalOpen(false);
                // make sure there is something changed
                // check if objects are the same

                // generate a new QR code
                updateQrCode();
               
            }}
        
            type="submit">Save changes</Button>

            
          </DialogFooter>
          <div className={'bg-destructive/10 text-destructive text-sm p-2 rounded-md mt-4'}>
          <p>
          <strong>Note:</strong> To ensure safety, updating your privacy settings will make all previous QR codes invalid and generate a new QR code.
          This means that anyone who has the old QR code will not be able to access your medical record anymore.
          </p>
        </div>
            </DialogContent>
          </Dialog>

        }

        
          
       </div>

       
      </div>
    </div>
    </div>
  );
}
