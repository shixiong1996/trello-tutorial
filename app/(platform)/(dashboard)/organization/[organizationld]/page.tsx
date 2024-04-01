import { auth } from "@clerk/nextjs"

const OrganizationIdPage = () => {
    const { userId, orgId } = auth()
    return (
        <div>
            OrganizationIdPage: {orgId}
        </div>
    )
}

export default OrganizationIdPage