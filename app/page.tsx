import AddMaterialsForm from "@/components/AddMaterialsForm";

export default async function Page() {
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <h1 className="text-textColor-400 font-bold text-2xl mt-5">Dashboard</h1>
      <div className="h-[91vh] mt-8 bg-white rounded-2xl p-20">
        <AddMaterialsForm />
      </div>
    </div>
  );
}
