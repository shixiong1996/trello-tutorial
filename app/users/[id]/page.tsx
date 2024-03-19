export default function IdPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div>
      id: {params.id}
    </div>
  )
}