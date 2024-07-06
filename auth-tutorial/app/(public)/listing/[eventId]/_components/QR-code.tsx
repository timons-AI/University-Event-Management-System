"use client";

import QRCode from "react-qr-code";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QRCodeProps {
  value: string;
}

const QRCodeComponent = ({ value }: QRCodeProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Event QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-inner">
          <QRCode
            value={value}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Scan this QR code at the event entrance
        </p>
      </CardContent>
    </Card>
  );
};

export default QRCodeComponent;
