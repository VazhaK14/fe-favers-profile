"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import type { TeamMember } from "../const";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  return (
    <main className="relative z-10 py-12   px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Our Team
        </h2>
        <p className="mt-4 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
          The people behind the magic.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-white/40 backdrop-blur-lg border border-white/40 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out hover:bg-white/60 p-2 h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.urlAvatar} alt={member.name} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">
                    {member.name}
                  </h3>
                  <h2>{member.npm}</h2>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{member.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
