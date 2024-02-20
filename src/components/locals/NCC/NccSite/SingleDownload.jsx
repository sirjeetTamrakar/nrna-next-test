import { changeDateFormat } from "@/utils/dateUtils";
import { useRouter } from "next/router";

const SingleDownload = () => {
  const router = useRouter();
  const state = router?.query;

  return (
    <>
      <div className="main_content">
        <section className="all_events">
          <div className="container">
            <div className="about_title">{state?.title}</div>
            <div dangerouslySetInnerHTML={{ __html: state?.description }} />
            <p>
              Posted On:{" "}
              <span>{changeDateFormat(state?.updatedDate, "LL")}</span>
            </p>
            <iframe
              src={state?.file}
              width={"100%"}
              height={"900"}
              frameBorder="0"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleDownload;
