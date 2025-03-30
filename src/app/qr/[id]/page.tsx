import { getProfileForUser } from "@/backend/profile";
import { getQrCodeWithUuid } from "@/backend/qr-code";
import { getUser } from "@/backend/user";
import QRCodeComponent from "@/components/code";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function QrSlugPage({
    params,
    }: {
    params: { id: string };
    }) {
    // This page is for QR code scanning and will handle the logic for it
    // You can implement QR code scanning logic here
    const { id: uuid } = await params;

    const gottenQrCode = await getQrCodeWithUuid(uuid);

    if (!gottenQrCode) {
        notFound();
    }

    const user = await getUser(gottenQrCode.userId);

    if (!user) {
        // If the user does not exist, return a 404
        notFound();
    }

    const profile = await getProfileForUser(gottenQrCode.userId);
    if (!profile) {
        // If the profile does not exist, return a 404
        // This means the user has not completed their profile
        notFound();
    }

    // At this point, you have a valid QR code and user
    // You can now return the QR code component or any other relevant information

    const age = profile.dateOfBirth
    ? Math.floor(
        (new Date().getTime() - new Date(profile.dateOfBirth).getTime()) / 
        (1000 * 60 * 60 * 24 * 365.25) // Calculate age in years
    )
    : null; // Handle the case where dateOfBirth is not provided

    return (
      
        <div className="text-center mb-4 flex items-center flex-col gap-2 pt-16">
          <Link
          href={'/'}
          >
            <Image
            src={"/logos/logo.svg"}
            alt={"Health Profile Logo"}
            width={80}
            height={80}
            className={"grayscale opacity-50"}
            />
          </Link>
          
          <h1 className="text-2xl font-bold">Health Profile</h1>
         
        <Table
        className={'max-w-xl w-full mx-auto mt-4 border border-gray-300 rounded-md shadow-md'}
        >
            <TableCaption>
                This table contains the health information associated with the QR code scanned. 
                Please ensure that you have permission to access this information.
                <br />
                <br />
                Note: This information is confidential and should be handled with care.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Field</TableHead>
                    <TableHead className="text-left">Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="w-[150px]">Full Name</TableCell>
                    <TableCell className="text-left">
                        {gottenQrCode.shareName ?
                        `${user.name}`
                        :
                        // If the user has not provided permission to share their full name
                        "Not provided"
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="w-[150px]">Date of Birth</TableCell>
                    <TableCell className="text-left">
                        {gottenQrCode.shareDateOfBirth ?
                        `${profile.dateOfBirth ? `${new Date(profile.dateOfBirth).toLocaleDateString()} (${age ?? 0} years old)` : "Not provided"}`
                        :
                        // If the user has not provided permission to share their full name
                        "Not provided"
                        }
                    </TableCell>
                </TableRow>
               
            </TableBody>
        </Table>

        <Button
            className="mt-4"
            variant="solid"
            
        >
            Print this Page
        </Button>

        <div className="mt-4">
            <QRCodeComponent
                value={gottenQrCode}
                link={`${process.env.BASE_URL}/qr/${uuid}`} // This will be the URL to access this QR code
            />
            <p className="text-sm text-muted-foreground mt-2">Scan this QR code to access this health profile.</p>
            
        </div>
        </div>
    );
}