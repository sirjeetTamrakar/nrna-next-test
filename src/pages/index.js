import NBNS from "@/components/locals/NBNS";
import NBNSLayout from "@/layouts/authLayout/NBNSLayout";

export default function Home() {
  return (
    <>
      <NBNS />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <NBNSLayout>{page}</NBNSLayout>;
};
