"use server";
import { decode } from "base64-arraybuffer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const uploadProposalDoc = async (
  fileName: string,
  fileData: string
): Promise<any> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  //   console.log("SERVER FILE DATA: ", fileData.split(",")[1]);
  console.log("FILENAME: ", fileName);

  const { data, error } = await supabase.storage
    .from("proposal_documents")
    .upload("public/" + fileName, decode(fileData), {
      contentType: "application/pdf",
    });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default uploadProposalDoc;
