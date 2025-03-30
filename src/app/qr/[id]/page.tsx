import { getQrCodeWithUuid } from "@/backend/qr-code";
import { notFound } from "next/navigation";

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

    console.log(gottenQrCode)

    return (
        <div>
        <h1>QR Code Page</h1>
        {/* Add your QR code scanning logic here */}
        </div>
    );
}