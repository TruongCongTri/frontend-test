import { requireAuth } from "@/components/actions/auth";

import { getUserProfile } from "@/libs/api/apiFunction";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import DashboardTabs from "@/components/layout/DashboardTab";

export default async function DashboardPage() {
  // Check if user is authenticated
  const phoneData = await requireAuth();

  // Get liked GitHub users
  const res = await getUserProfile(phoneData.withoutPlus);
  const users = res.data.data.user.favorite_github_users;

  return (
    <LayoutWrapper>
      <Breadcrumb />
      <DashboardTabs users={users} />
    </LayoutWrapper>
  );
}
