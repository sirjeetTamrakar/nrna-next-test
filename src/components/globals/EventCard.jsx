import { changeDateFormat } from "@/utils/dateUtils";
import Link from "next/link";
const EventCard = ({ event, linkUrl }) => {
  return (
    <div className="col-12 col-md-6">
      <div className="event_card_title">{event?.title}</div>
      <div className="event_card">
        <div className="event_card_content">
          <ul className="event_card_list">
            <li>
              <div className="title">Location :</div>
              <div className="value">{event?.location}</div>
            </li>
            <li>
              <div className="title">Venue :</div>
              <div className="value">{event?.venue}</div>
            </li>
            <li>
              <div className="title">Date :</div>
              <div className="value">{changeDateFormat(event?.event_date)}</div>
            </li>
            <li>
              <div className="title">Time :</div>
              <div className="value">
                {changeDateFormat(event?.time, "hh:MM A")}
              </div>
            </li>
            <li>
              <div className="title">Contact :</div>
              <div className="value">{event?.contact_phone}</div>
            </li>
            <li>
              <div className="title">Email</div>
              <div className="value email">{event?.contact_email}</div>
            </li>
          </ul>
          <Link className="btn-sm event_btn" href={linkUrl}>
            View Detail
          </Link>
        </div>
        <div className="img_wrapper">
          <img src={event?.feature_image} alt="" />
        </div>
      </div>
    </div>
  );
};
export default EventCard;
