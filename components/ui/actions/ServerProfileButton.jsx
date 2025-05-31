import ProfileButton from "./ProfileButton";
import { getJsonCookie } from "@/components/actions/cookies";

export default async function ServerProfileButton() {
  const phoneData = await getJsonCookie("phone_data");

  if (!phoneData) return null;

  const { country, countryCode, nationalNumber } = phoneData;

  return (
    <ProfileButton
      country={country}
      countryCode={countryCode}
      nationalNumber={nationalNumber}
    />
  );
}
