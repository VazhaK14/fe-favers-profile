import { useLoaderData } from "react-router";
import type { TeamMember } from "./const";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function HomeModule() {
  const { members } = useLoaderData() as { members: TeamMember[] };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            The people behind the magic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member: TeamMember) => (
            <Card
              key={member.id}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.urlAvatar} alt={member.name} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{member.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
