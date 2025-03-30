import { getProfileForUser } from "@/backend/profile";
import { auth } from "@/lib/auth/providers";
import { redirect } from "next/navigation";
import QRCodeComponent from "@/components/code";
import { createQrCode, getQrCode, updateQrCodePrivacy } from "@/backend/qr-code";

export default async function QRCodePage() {
  const user = await auth();
  
  if (user !== null) {
    // make sure that the user has a profile
    const userId = user.user?.id;
    if (userId === undefined) {
      // If userId is undefined, redirect to login
      // This should not happen if the auth flow is correct
      redirect("/login");
    }
    // At this point, we have a valid userId
    const profile = await getProfileForUser(userId);
    if (profile === null) {
      // If the profile does not exist, redirect to onboarding
      // This ensures that the user completes their profile before accessing the QR code
      redirect("/onboarding");
    }
  } else {
    // redirect to login
    redirect("/login");
  }

  let qrCode;
  const userId = user.user?.id;
  
  if (userId === undefined) {
    // If userId is undefined, redirect to login
    // This should not happen if the auth flow is correct
    return redirect("/login");
  }
  else {
    // Fetch the QR code for the user
    qrCode = await getQrCode(userId);
    if (qrCode === null) {
      // If no QR code exists for the user, create a new one
      qrCode = await createQrCode(userId);
    }
  }

  return (
    <QRCodeComponent
    link={`${process.env.BASE_URL}/qr/${qrCode.uuid}`} // This should be the route to handle QR code scanning
    value={qrCode} // Pass the user ID or any other unique identifier as the value for the QR code
    />
  );
}
