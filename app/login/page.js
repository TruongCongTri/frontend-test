import React, { Suspense } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import LoginForm from "@/components/auth/guards/LoginForm";

export default function LoginPage() {
  return (
    <LayoutWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumb />
      </Suspense>
      <LoginForm />
    </LayoutWrapper>
  );
}
