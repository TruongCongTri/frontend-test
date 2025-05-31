import NavBar from "./NavBar";
import { getJsonCookie } from "../actions/cookies";

export default async function NavBarWrapper() {
  const phoneData = await getJsonCookie("phone_data");
  const isAuthenticated = !!phoneData;

  return <NavBar isAuthenticated={isAuthenticated} phoneData={phoneData} />;
}
