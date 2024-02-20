import moment from 'moment';

export const TimeAgo = ({ time }) => {
  const timeago = moment(time).fromNow();
  return <>{timeago}</>;
};
