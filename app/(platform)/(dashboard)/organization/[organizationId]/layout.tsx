import OrgContol from "./_components/org-contol"

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