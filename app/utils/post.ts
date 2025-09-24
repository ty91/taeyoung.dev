export async function getPosts() {
  // mock data
  return [
    {
      id: 1,
      title: "Test Post",
      date: "2025-09-24",
      slug: "test",
    },
    {
      id: 2,
      title: "Test Post 2",
      date: "2025-09-24",
      slug: "test-2",
    },
  ];
}

export async function getPost(slug: string) {
  // mock data
  return {
    id: 1,
    title: "Test Post",
    date: "2025-09-24",
    slug: "test",
  };
}
