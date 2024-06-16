"use client";
import QRCode from "react-qr-code";
import React from "react";

interface QRCodeProps {
  value: string;
}

const QRCodeComponent = ({ value }: QRCodeProps) => {
  return (
    <div>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCode value={value} viewBox={`0 0 256 256`} />
      </div>
    </div>
  );
};

export default QRCodeComponent;
