import { startCase } from "lodash" // 转换string为开头字母大写
import { auth } from "@clerk/nextjs"

import OrgContol from "./_components/org-contol"

export async function generateMetadata() {
  const { orgSlug } = auth()

  return {
    title: startCase(orgSlug || 'Organization'),
  }
}

const OrganizationIdLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <OrgContol />
      {children}
    </>
  )
}

export default OrganizationIdLayout