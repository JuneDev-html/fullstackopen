/* eslint-disable react/prop-types */
export const Notification = ({ notification }) => {
  const { message, status } = notification;
  if (message === null) {
    return null;
  }
  let classes = "";
  status === "successful"
    ? (classes = "notification successful")
    : (classes = "notification error");
  return <div className={classes}>{message}</div>;
};
