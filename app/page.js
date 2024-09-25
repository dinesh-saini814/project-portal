import GetPublicProjects from "@/components/publicProjecrs/GetPublicProjects";
import PublicProjects from "@/components/publicProjecrs/PublicProjects";

import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <GetPublicProjects />
      <PublicProjects />
    </main>
  );
}
