const OrganizationIdPage = () => {
  console.log('i am logged in the browser')
  async function create(formData: FormData) {
    'use server'

    const title = formData.get('title') as string

    
  }

  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
      </form>
    </div>
  );
};

export default OrganizationIdPage;