import { changeDateFormat } from "@/utils/dateUtils";
import { useRouter } from "next/router";

const SingleDownload = () => {
  const state = useRouter()?.query;
  return (
    <>
      <div className="main_content">
        <section className="all_events">
          <div className="container">
            <div className="about_title" style={{ fontSize: "20px" }}>
              {state?.title}
            </div>
            <div dangerouslySetInnerHTML={{ __html: state?.description }} />
            {state?.updateDate && (
              <p>
                Posted On:{" "}
                <span>{changeDateFormat(state?.updatedDate, "LL")}</span>
              </p>
            )}
            <iframe
              src={state?.file_src}
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
