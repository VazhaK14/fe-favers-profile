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
    npm: "2406406710",
    role: "Mobdev",
    desc: "banyak nanya vazha terkait webdev",
    urlAvatar: "/farrel.jpeg",
  },
  {
    id: "2",
    name: "Adjie M. Usman",
    npm: "2406423313",
    role: "Mobdev",
    desc: "Jujur bingung mo isi apa",
    urlAvatar: "/adjie.jpg",
  },
  {
    id: "3",
    name: "Arief Solomon",
    npm: "2406343092",
    role: "BE",
    desc: "bismillah",
    urlAvatar: "/arief.jpeg",
  },
  {
    id: "4",
    name: "Elliot Randy Panggabean",
    npm: "2406413104",
    role: "FE",
    desc: "mohon arahannya teman2",
    urlAvatar: "/elliot.jpeg",
  },
  {
    id: "5",
    name: "Vazha Khayri",
    npm: "2406495911",
    role: "Gatau Ngapain",
    desc: "Semoga gaada axios 1.14.1/0.30.4 di packagenya. Eh iya kan pake bun 😋",
    urlAvatar: "/vazha.jpeg",
  },
];
