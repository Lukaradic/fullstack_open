import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField.js";

export const CreateNew = ({ addNew }) => {
  const navigate = useNavigate();

  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");
  const {
    value: content,
    onChange: onContentChange,
    reset: resetContent,
  } = useField("text");
  const {
    value: author,
    onChange: onAuthorChange,
    reset: resetAuthor,
  } = useField("text");
  const {
    value: info,
    onChange: onInfoChange,
    reset: resetInfo,
  } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" value={content} onChange={onContentChange} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={onAuthorChange} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={onInfoChange} />
        </div>
        <button>create</button>
        <button onClick={handleReset} type="button">
          reset
        </button>
      </form>
    </div>
  );
};
