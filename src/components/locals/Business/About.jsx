const About = ({ data }) => {
  return (
    <div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "500",
          marginBottom: "17px",
        }}
      >
        About Us
      </p>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "400",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </div>
  );
};

export default About;
