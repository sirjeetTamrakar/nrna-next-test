import NBNSLayout from "./NBNSLayout";

export default function NBNS() {
  return <></>;
}

NBNS.getLayout = function getLayout(page) {
  return <NBNSLayout>{page}</NBNSLayout>;
};
