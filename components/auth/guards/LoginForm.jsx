"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import PhoneNumberField from "@/components/form/fields/PhoneNumberField";
import OTPInput from "@/components/form/fields/OTPInput";

import { phoneSchema, otpSchema } from "@/libs/authValidation";
import { transformPhoneNumber } from "@/libs/transformPhoneNumber";
import { createAccessCode, validateAccessCode } from "@/libs/api/apiFunction";

import { login } from "@/components/actions/login";

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [parsedInfo, setParsedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [codeExpiry, setCodeExpiry] = useState(0);

  useEffect(() => {
    if (codeExpiry > 0) {
      const timer = setTimeout(() => setCodeExpiry(codeExpiry - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [codeExpiry]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePhoneSubmit = async () => {
    try {
      setIsLoading(true);
      await phoneSchema.validate({ phone_number: phone });
      const phoneData = transformPhoneNumber(phone);
      setParsedInfo(phoneData);
      await createAccessCode({ phone_number: phoneData.withoutPlus });

      toast.success(`Code sent to ${phoneData.withoutPlus}`);
      setMessage(
        `✅ Code sent to ${phoneData.withoutPlus} ! Please enter it below.`
      );

      setStep(2);
      setCodeExpiry(300);
      setResendCooldown(60);
    } catch (error) {
      toast.error(error?.message || "Validation error");
      setMessage(`❌ ${error?.message || "Validation error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      if (!parsedInfo?.withoutPlus) throw new Error("Missing phone number");
      setIsLoading(true);

      const validated = await otpSchema.validate({
        phone_number: parsedInfo.international,
        access_code: code,
      });
      await validateAccessCode(validated);

      localStorage.setItem("phone_number", validated.phone_number);
      localStorage.setItem("phone_data", JSON.stringify(parsedInfo));

      await login(parsedInfo);

      toast.success("Validated! Redirecting...");
      setMessage("✅ Validated! Redirecting...");

      router.push("/search");
    } catch (error) {
      toast.error(error?.message || "Validation error");
      setMessage(`❌ ${error?.message || "Validation error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (!parsedInfo?.withoutPlus) throw new Error("Missing phone number");
      setIsLoading(true);

      await createAccessCode({ phone_number: parsedInfo.withoutPlus });
      toast.success(`Code resent to ${parsedInfo.withoutPlus}`);
      setMessage(`🔁 New code sent to ${parsedInfo.withoutPlus}.`);

      setCodeExpiry(300);
      setResendCooldown(60);
    } catch (error) {
      toast.error(error?.message || "Failed to resend code");
      setMessage(`❌ ${error?.message || "Failed to resend code"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label className="text-sm md:text-base">Enter Phone Number:</label>
      <PhoneNumberField
        value={phone}
        onChange={setPhone}
        disabled={step === 2}
      />

      {step === 1 ? (
        <button
          onClick={handlePhoneSubmit}
          disabled={isLoading || !phone.trim()}
          className={`w-full text-sm md:text-base ${
            !phone.trim() || isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-[#00ff88] hover:text-black transition-colors"
          }`}
        >
          {isLoading ? "Sending..." : "Generate Access Code"}
        </button>
      ) : (
        <>
          <label className="text-sm md:text-base">Enter Access Code:</label>
          <OTPInput value={code} onChange={setCode} disabled={isLoading} />
          <div className="flex gap-4">
            <button
              onClick={handleCodeSubmit}
              disabled={!code.trim() || isLoading}
              className={`text-sm flex-1 md:text-base ${
                !code.trim() || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-[#00ff88] hover:text-black transition-colors"
              }`}
            >
              {isLoading ? "Validating..." : "Validate Code"}
            </button>
            <button
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || isLoading}
              className={`text-sm flex-1 md:text-base ${
                resendCooldown > 0 || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-[#00ff88] hover:text-black transition-colors"
              }`}
            >
              {resendCooldown > 0 ? `Wait (${resendCooldown}s)` : "Resend Code"}
            </button>
          </div>

          {codeExpiry > 0 && (
            <p className="text-yellow-300 mt-4 mb-4 text-sm md:text-base text-center md:text-left">
              ⏳ Code expires in {Math.floor(codeExpiry / 60)}:
              {(codeExpiry % 60).toString().padStart(2, "0")}
            </p>
          )}
        </>
      )}

      {message && (
        <p className="mt-4 text-[#00ffff] text-sm md:text-base text-center md:text-left">
          {message}
        </p>
      )}
    </div>
  );
}
