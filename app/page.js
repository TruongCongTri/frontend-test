import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import AuthActionGate from "@/components/auth/guards/AuthActionGate";

export default function Home() {
  return (
    <LayoutWrapper>
      <Breadcrumb />
      <section className="mt-10 space-y-6">
        <h2 className="text-2xl">
          &gt; Welcome to{" "}
          <span className="text-[#00ff88]">GitHub CLI Explorer</span>
        </h2>

        <p>
          This web application emulates a{" "}
          <strong>command-line interface</strong> for exploring GitHub profiles.
          With just a phone number, you can:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>
            🔍 <strong>Search</strong> for any GitHub user by username
          </li>
          <li>
            ❤️ <strong>Like</strong> your favorite profiles and save them
          </li>
          <li>
            📱 <strong>Log in</strong> securely using your phone number — no
            passwords required
          </li>
        </ul>

        <p>
          All interactions are styled like a terminal. No unnecessary UI — just
          a streamlined experience.
        </p>
        <AuthActionGate />
      </section>
    </LayoutWrapper>
  );
}
