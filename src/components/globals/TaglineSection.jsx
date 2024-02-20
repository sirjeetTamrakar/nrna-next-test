const TaglineSection = ({ taglineAuthor, tagline }) => {
  return (
    <section className="tagline">
      <div className="container">
        <div className="tagline_title">{tagline ? tagline.replace(/(<([^>]+)>)/gi, '') : ''}</div>
        <div className="tagline_name">- {taglineAuthor ? taglineAuthor : 'Author'}</div>
      </div>
    </section>
  );
};

export default TaglineSection;
