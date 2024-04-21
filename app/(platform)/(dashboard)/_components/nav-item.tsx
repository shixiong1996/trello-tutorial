'use client'

type organization = {
  id: string
  sulg: string
  imageUrl: string
  name: string
}

interface NavItemProps {
  isExpanded: boolean
  isActive: boolean
  organizationId: organization
  onExpand: (id: string) => void
}

export const NavItem = () => {
  return (
    <div>NavItem</div>
  )
}