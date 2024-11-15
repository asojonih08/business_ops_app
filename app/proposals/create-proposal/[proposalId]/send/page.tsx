import React from "react";

import getProposal from "@/actions/getProposal";
import getClient from "@/actions/getClient";
import getProject from "@/actions/getProject";
import getEstimatesByProposal from "@/actions/getEstimatesByProposal";

import SendProposal from "@/components/SendProposal";
import getClients from "@/actions/getClients";

export default async function page({ params }: any) {
  const proposalId = Number(params.proposalId?.slice(9));
  // console.log(proposalId);
  const proposal = await getProposal(proposalId);
  const proposalItems = await getEstimatesByProposal(proposalId);
  const client = await getClient(proposal.client);
  const clients = await getClients();

  // console.log("Client: ", client);

  const project = await getProject(proposal.project);

  return (
    <SendProposal
      proposal={proposal}
      proposalItems={proposalItems}
      clients={clients}
      client={client}
      project={project}
    ></SendProposal>
  );
}
