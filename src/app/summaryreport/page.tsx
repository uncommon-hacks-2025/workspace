'use client';


import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function SummaryReportPage() {
  const [reportData, setReportData] = useState<string | null>(null);

  // Placeholder handler: in future, this can fetch data from backend
  const handleGenerateReport = async () => {
    
    const mockReport = "This is a summary report for the user based on medical history and activity.";
    setReportData(mockReport);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Summary Report</h1>
      <button
        onClick={handleGenerateReport}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
      >
        Generate Report
      </button>

      {reportData && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Report Preview:</h2>
          <p className="whitespace-pre-line mb-4">{reportData}</p>

          <h3 className="text-lg font-medium mb-1">QR Code:</h3>
          <QRCodeSVG value={reportData} size={128} />
        </div>
      )}
    </div>
  );
}
