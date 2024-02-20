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
            Followers Name:
          </span>
          <div style={{ fontSize: '16px' }}>{data?.full_name ? data?.full_name : '-'}</div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Username:</span>
          <div style={{ fontSize: '16px' }}>{data?.username ? data?.username : '-'}</div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Email:</span>
          <div style={{ fontSize: '16px' }}>{data?.email ? data?.email : '-'}</div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Phone:</span>
          <div style={{ fontSize: '16px' }}>{data?.phone ? data?.phone : '-'}</div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
            Country of residence:
          </span>
          <div style={{ fontSize: '16px' }}>
            {data?.country_of_residence ? data?.country_of_residence : '-'}
          </div>
        </div>
      </li>
    </ol>
  );
};

export default View;
