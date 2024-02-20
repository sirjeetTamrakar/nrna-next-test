import profileImage2 from "@/assets/images/profileImage2.jpg";
import Image from "next/image";
import Link from "next/link";

const OurTeamCard = ({ candidate }) => {
  return (
    <Link href={`/${candidate?.member?.username}`} className="political_item">
      <div className="img_container">
        <Image
          src={
            candidate?.member?.profile_image
              ? candidate?.member?.profile_image
              : profileImage2
          }
          alt=""
        />
      </div>
      <div className="political_item_title text-center">
        {candidate?.member?.full_name !== ""
          ? candidate?.member?.full_name
          : candidate?.member?.username}
      </div>
      <div className="political_item_subtitle text-center">
        {candidate?.designation}
      </div>
    </Link>
  );
};

export default OurTeamCard;
