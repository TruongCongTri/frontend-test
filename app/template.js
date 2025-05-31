import NavBarWrapper from "@/components/layout/NavBarWrapper";

export default function RootTemplate({ children }) {
  return (
    <>
      <NavBarWrapper />
      {children}
    </>
  );
}
