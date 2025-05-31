import Link from "next/link";
import ActionButton from "@/components/ui/actions/ActionButton";

export default function LoginButton() {
  return (
     <Link href="/login">
      <ActionButton
        className="bg-black text-white border border-gray-600 px-3 py-1 outline-none hover:bg-gray-800 cursor-pointer"
      >
        Login
      </ActionButton>
    </Link>
  );
}
