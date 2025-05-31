"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneNumberField({ value, onChange, disabled }) {
  return (
    <div className="w-full">
      <PhoneInput
        defaultCountry="VN"
        international
        value={value}
        onChange={(val) => onChange(val || "")}
        disabled={disabled}
        className="react-phone-number-input mt-1 mb-4 w-full text-sm md:text-base"
        placeholder="Enter phone number"
      />
    </div>
  );
}
