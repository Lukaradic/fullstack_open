import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const notification = useSelector((state) => state.notification);
  const { text } = notification;

  console.log(notification);
  if (!text) {
    return null;
  }

  return <div style={style}>{text}</div>;
};

export default Notification;
