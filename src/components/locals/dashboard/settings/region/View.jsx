const View = ({ data }) => {
  return (
    // <ul>
    //   {Object.entries(data)?.map((list, index) => (
    //     <li key={index}>{list[0] + ' : ' + list[1]}</li>
    //   ))}
    // </ul>

    <ol style={{ paddingTop: '8px', paddingBottom: '8px', listStyle: 'none' }}>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
            Banner Title:
          </span>
          <div style={{ fontSize: '16px' }}>{data?.title ? data?.title : '-'}</div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div>
          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
              Feature Image:
            </span>
            {data?.image === '' && <div style={{ fontSize: '16px' }}>{'-'}</div>}
          </div>
          {data?.image && (
            <div style={{ width: '100px', height: '100px' }}>
              <img
                src={data?.image}
                alt=""
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </li>

      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Subtitle:</span>
          <div style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: data?.subtitle }} />
        </div>
      </li>
    </ol>
  );
};

export default View;
