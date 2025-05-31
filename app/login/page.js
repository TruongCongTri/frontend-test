import React from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import LoginForm from "@/components/auth/guards/LoginForm";

export default function LoginPage() {
  return (
    <LayoutWrapper>
      <Breadcrumb />
      <LoginForm />
    </LayoutWrapper>
  );
}
