import { getProfileForUser } from "@/backend/profile";
import { auth } from "@/lib/auth/providers";
import { redirect } from "next/navigation";
import { toPng } from "html-to-image";
import QRCodeComponent from "@/components/code";

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
    <QRCodeComponent 
    value={"" + user.user?.id} // Pass the user ID or any other unique identifier as the value for the QR code
    />
  );
}
