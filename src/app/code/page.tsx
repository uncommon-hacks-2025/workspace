import { auth } from "@/lib/auth/providers";
import { redirect } from "next/navigation";
import QRCode from "react-qr-code";

export default async function QRCodePage() {
  const user = await auth();

  if (user !== null) {
    // redirect
  } else {
    // redirect to login
    redirect("/login");
  }
  return (
    <div>
      <QRCode value="test" />
    </div>
  );
}
