import Masonry from 'react-masonry-css';

const CustomMasonry = ({ children }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    480: 1
  };

  return (
    <div>
      {' '}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {children}
      </Masonry>
    </div>
  );
};

export default CustomMasonry;
