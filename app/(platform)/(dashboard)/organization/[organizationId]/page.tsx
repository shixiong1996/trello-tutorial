import { db } from "@/lib/db";

const OrganizationIdPage = () => {
  async function create(formData: FormData) {
    'use server'

    // 获取组织 ID
    const title = formData.get('title') as string

    // 创建一个新的 board
    await db.board.create ({
      data: {
        title: title,
      }
    })
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