import OrgContol from "./_components/org-contol"

const OrganizationIdLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <OrgContol />
      {children}
    </div>
  )
}

export default OrganizationIdLayout