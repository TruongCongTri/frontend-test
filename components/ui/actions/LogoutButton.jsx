"use client";

import { useRouter } from "next/navigation";
import ActionButton from "@/components/ui/actions/ActionButton";
import { logout } from "@/components/actions/logout";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear client-side storage
    localStorage.removeItem("phone_number");
    localStorage.removeItem("phone_data");

    // Server-side cookie removal
    await logout();

    // Redirect
    router.push("/login");
  };

  return (
    <ActionButton
      onClick={handleLogout}
      className="bg-red-600 text-white border border-red-700 px-3 py-1 outline-none hover:bg-red-700 cursor-pointer"
    >
      Logout
    </ActionButton>
  );
}
