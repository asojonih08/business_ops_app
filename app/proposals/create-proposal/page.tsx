import React from "react";

import getClients from "@/actions/getClients";
import getProjects from "@/actions/getProjects";
import CreateProposal from "@/components/CreateProposal";

export default async function page() {
  const clients = await getClients();
  const projects = await getProjects();
  return (
    <div className="w-full h-full bg-white px-12 py-12 2xl:px-0 2xl:py-0 p-6 rounded-2xl">
      <CreateProposal clients={clients} projects={projects} />
    </div>
  );
}
