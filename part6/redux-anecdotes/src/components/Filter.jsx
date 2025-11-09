import { useStore } from "react-redux";
import { applyTerm } from "../reducers/filterReducer";

export const Filter = () => {
  const store = useStore();

  const handleChange = (e) => {
    const value = e.target.value;
    store.dispatch(applyTerm(value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};
