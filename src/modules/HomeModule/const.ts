export type TeamMember = {
  id: string;
  name: string;
  npm: string;
  role: string;
  desc: string;
  urlAvatar: string;
};

export const members: TeamMember[] = [
  {
    id: "1",
    name: "Farrel Arrayyan Adrianshah",
    npm: "123456789",
    role: "Mobdev",
    desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, cupiditate earum? Tenetur sint dolorem eum culpa nobis quae voluptates modi numquam rerum commodi temporibus fugit, laboriosam odio aliquid, officia cum.",
    urlAvatar: "https://i.pravatar.cc/150?u=alice",
  },
  {
    id: "2",
    name: "John Doe",
    npm: "987654321",
    role: "Frontend Engineer",
    desc: "Expert in React and Tailwind CSS. Loves building beautiful user interfaces.",
    urlAvatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    id: "3",
    name: "Jane Smith",
    npm: "456123789",
    role: "Backend Engineer",
    desc: "Passionate about API design, databases, and system architecture.",
    urlAvatar: "https://i.pravatar.cc/150?u=jane",
  },
  {
    id: "4",
    name: "Alex Johnson",
    npm: "789123456",
    role: "UI/UX Designer",
    desc: "Crafting digital excellence through minimalist and elegant design systems.",
    urlAvatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: "5",
    name: "Sarah Williams",
    npm: "321654987",
    role: "Project Manager",
    desc: "Ensuring smooth execution and delivery of high-quality software products.",
    urlAvatar: "https://i.pravatar.cc/150?u=sarah",
  },
];
