import { Material, columns } from "./estimate/columns";
import { DataTable } from "./estimate/data-table";

async function getData(): Promise<Material[]> {
  // Fetch data from your API here.
  return [
    {
      num: 1,
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      num: 2,
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      num: 3,
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      num: 4,
      type: "",
      description: "",
      quantity: null,
      rate: 0,
      amount: null,
    },

    // ...
  ];
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <h1 className="text-textColor-400 font-bold text-2xl mt-5">Dashboard</h1>
      <div className="h-[91vh] mt-8 bg-white rounded-2xl p-96">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
