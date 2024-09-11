import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <Link href={"/proposals/create-proposal"}>Create Proposal</Link>
      <Link href={"/proposals/create-proposal/project1"}>Test</Link>
    </div>
  );
}
