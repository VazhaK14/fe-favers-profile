import { useLoaderData } from "react-router";
import type { TeamMember } from "./const";

export default function HomeModule() {
  const { members } = useLoaderData() as { members: TeamMember[] };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            The people behind the magic.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member: TeamMember) => (
            <div
              key={member.id}
              className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={member.urlAvatar}
                      alt={member.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
