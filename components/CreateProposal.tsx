"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import NewClientForm from "./NewClientForm";
import ClientSelect from "./ClientSelect";
import { Client, Project } from "@/types";
import NewProjectForm from "./NewProjectForm";
import ProjectSelect from "./ProjectSelect";
import ItemsInput from "./ItemsInput";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useItemClassifications } from "./ItemClassificationsContext";
import insertProposal from "@/actions/insertProposal";
import insertEstimatesItemClassifications from "@/actions/insertEstimatesItemClassifications";
import updateProposalEstimates from "@/actions/updateProposalEstimates";
import getClients from "@/actions/getClients";
import getProjects from "@/actions/getProjects";

interface CreateProposalProps {
  clients: Client[];
  projects: Project[];
}

export default function CreateProposal({
  clients,
  projects,
}: CreateProposalProps) {
  const [selectedKey, setSelectedKey] = useState<number>(-1);
  const [searchClients, setSearchClients] = useState<Client[]>(clients);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [openClientForm, setOpenClientForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { itemClassifications } =
    useItemClassifications();

  const router = useRouter();

  const clientNames = searchClients.map((client) =>
    client.client_type === "Company"
      ? client.company_name
      : client.primary_contact_name
  );

  async function refreshClients() {
    const updatedClients = await getClients();
    setSelectedClient(updatedClients[0])
    setSelectedKey(0)
    setSearchClients(updatedClients);
  }

  async function refreshProjects() {
    const updatedProjects = await getProjects();
    const newFilteredProjects = updatedProjects.filter(
      (project) => project.client === selectedClient?.id
    );
    setFilteredProjects(newFilteredProjects);
    setSelectedProject(newFilteredProjects[0]);
  }

  useEffect(() => {
    if (selectedKey !== -1) {
      console.log(selectedClient, "\nProjects: ", filteredProjects);
      setFilteredProjects(
        projects.filter((project) => project.client === selectedClient?.id)
      );
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedClient === null) {
      const clientAssociatedToProject = clients?.find(
        (client) => client.id === selectedProject?.client
      );
      let indexOfClient = -1;
      if (clientAssociatedToProject)
        indexOfClient = clients?.indexOf(clientAssociatedToProject);
      setSelectedKey(indexOfClient);

      setSelectedClient(clientAssociatedToProject ?? null);
    }
  }, [selectedProject]);

  async function handleNextClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedClient || !selectedProject) return;

    const proposalData = new FormData();
    if (selectedProject?.id)
      proposalData.append("project", (selectedProject?.id).toString());
    proposalData.append("status", "Draft");
    const proposals = await insertProposal(proposalData);
    // console.log(proposals)
    const newProposalId = proposals[proposals.length - 1]?.id;

    const itemClassificationsData = new FormData();
    let itemClassificationsCount = 0;
    // console.log(itemClassifications.length);
    // console.log(itemClassifications);
    itemClassifications.map((itemClassification, index) => {
      if (
        itemClassification.name &&
        itemClassification.type &&
        itemClassification.room
      ) {
        itemClassificationsData.append("item" + index, itemClassification.name);
        itemClassificationsData.append("item" + index, itemClassification.type);
        itemClassificationsData.append("item" + index, itemClassification.room);
        itemClassificationsCount += 1;
      }
    });
    // console.log("projectId: ", selectedProject?.id);
    // console.log("clientId: ", selectedClient?.id);
    // console.log("proposald: ", newProposalId);
    if (selectedProject.id)
      itemClassificationsData.append("project", selectedProject?.id.toString());
    if (selectedClient.id)
      itemClassificationsData.append("client", selectedClient?.id);
    if (newProposalId)
      itemClassificationsData.append("proposal", newProposalId.toString());

    itemClassificationsData.append(
      "itemClassificationsCount",
      itemClassificationsCount.toString()
    );

    const estimates = await insertEstimatesItemClassifications(
      itemClassificationsData
    );
    console.log(estimates);
    if (newProposalId)
      proposalData.append("proposal", newProposalId.toString());

    for (
      let i = estimates.length - itemClassificationsCount;
      i < estimates.length;
      i++
    ) {
      let estimateId = -1;
      if (estimates[i]) estimateId = estimates[i].id ?? -1;

      // console.log(estimateId);
      proposalData.append("estimates", estimateId.toString());
    }
    console.log("proposalData (estimates): ", proposalData.getAll("estimates"));
    await updateProposalEstimates(proposalData);

    // router.push(`/proposals/create-proposal/${selectedProject?.id}`);
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full">
      <div className="flex w-full justify-center gap-[8%]">
        <div className="h-64 2xl:h-96 flex flex-col gap-4">
          <span className="font-semibold text-ACCENT-800 text-[15px] 2xl:text-xl w-[300px] 2xl:w-[400px] flex justify-between">
            <p>Choose Client</p>
            <Sheet               
            open={openClientForm}
              onOpenChange={(open: boolean) => {
                setOpenClientForm(open);
              }}>
              <SheetTrigger asChild>
                <Button className="p-0 w-7 h-7 bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200">
                  <FaPlus className="h-3.5 w-3.5 text-textColor-800/80" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-4">New Client</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <NewClientForm refreshClients={refreshClients} setOpenClientForm={setOpenClientForm} />
              </SheetContent>
            </Sheet>
          </span>
          <ClientSelect
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            searchClients={searchClients}
            setSearchClients={setSearchClients}
            setSelectedClient={setSelectedClient}
          />
        </div>
        <div className="flex flex-col gap-4 w-[540px] 2xl:w-[680px] ">
          <span className="font-semibold text-ACCENT-800 text-[15px] 2xl:text-xl flex justify-between">
            <p>Choose Project</p>
            <Sheet
              open={openProjectForm}
              onOpenChange={(open: boolean) => {
                if (selectedKey !== -1) setOpenProjectForm(open);
              }}
            >
              <SheetTrigger asChild>
                <Button
                  className={`${
                    selectedKey === -1
                      ? "bg-PRIMARY-600/10 hover:cursor-default"
                      : "bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30"
                  } w-7 h-7 p-0 duration-200 `}
                >
                  <FaPlus
                    className={`${
                      selectedKey === -1
                        ? "text-textColor-800/60"
                        : "text-textColor-800/80"
                    } w-3.5 h-3.5 `}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-4">New Project</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <NewProjectForm
                  refreshProjects={refreshProjects}
                  selectedClient={selectedClient}
                  setOpenProjectForm={setOpenProjectForm}
                />
              </SheetContent>
            </Sheet>
          </span>
          <div className="px-10 h-64 2xl:h-96 from-[#f7f9f9] to-ACCENT-base/40 bg-gradient-to-tr rounded-xl drop-shadow-md overflow-y-scroll">
            <ProjectSelect
              projects={filteredProjects}
              clientNames={clientNames}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full h-[40%] px-32">
        <ItemsInput selectedProject={selectedProject} />
      </div>
      <form className="w-full" onSubmit={handleNextClick}>
        <div className="w-full px-36 flex justify-center pt-4 2xl:pt-10">
          <Button
            className="flex items-center gap-1.5 justify-center rounded-md border-none bg-transparent from-ACCENT-100 to-ACCENT-base/40 bg-gradient-to-r font-semibold text-ACCENT-950 text-sm 2xl:text-lg w-[26%] 2xl:w-[28%] drop-shadow-md duration-500 px-0 py-0
                hover:bg-PRIMARY-300/70
        "
          >
            Next <FaArrowRightLong />
          </Button>
        </div>
      </form>
    </div>
  );
}
