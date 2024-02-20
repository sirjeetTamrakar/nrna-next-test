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
          <div style={{ fontSize: '16px' }}>
            {data?.user?.first_name ? data?.user?.first_name : '-'}{' '}
            {data?.user?.last_name ? data?.user?.last_name : '-'}
          </div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Username:</span>
          <div style={{ fontSize: '16px' }}>
            {data?.user?.username ? data?.user?.username : '-'}
          </div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Email:</span>
          <div style={{ fontSize: '16px' }}>{data?.user?.email ? data?.user?.email : '-'}</div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Phone:</span>
          <div style={{ fontSize: '16px' }}>{data?.user?.phone ? data?.user?.phone : '-'}</div>
        </div>
      </li>
      <li style={{ padding: '5px 0' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
            Country of residence:
          </span>
          <div style={{ fontSize: '16px' }}>
            {data?.user?.country_of_residence ? data?.user?.country_of_residence : '-'}
          </div>
        </div>
      </li>
    </ol>
  );
};

export default View;
