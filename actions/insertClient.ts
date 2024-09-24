import { Client} from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const insertClient = async (client: Client): Promise<Client[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase.from("clients").insert(client);

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default insertClient;