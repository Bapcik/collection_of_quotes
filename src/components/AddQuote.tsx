import axios from "axios";
import { useState } from "react";
import { ICollection } from "../interface/Interface";
import "../style/AddQuote.css";

export const AddQuote = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [, setQoutes] = useState<ICollection[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");

  const dataQoutes = async () => {
    try {
      const response = await axios.post(
        `https://control-8-62e8e-default-rtdb.europe-west1.firebasedatabase.app/quotes.json`,
        {
          author: newAuthor,
          text: newText,
          category: selectedPage,
        }
      );
      if (response.data) {
        const newPost: ICollection = {
          id: response.data.name,
          author: newAuthor,
          text: newText,
          category: selectedPage,
        };
        setQoutes((prevQoutes: ICollection[]) => [...prevQoutes, newPost]);
        setNewAuthor("");
        setNewText("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = event.target.value;
    setSelectedPage(selectedPage);
  };

  return (
    <>
      <div className="add-Post">
        <h2 className="title">Add post</h2>
        <div>
          <label htmlFor="page-select">Select Page:</label>
          <select
            id="page-select"
            value={selectedPage}
            onChange={handlePageSelect}
          >
            <option value="">Select Page</option>
            <option value="star-wars">Star Wars</option>
            <option value="famous-people">Famous people</option>
            <option value="saying">Saying</option>
            <option value="humour">Humour</option>
            <option value="motivational">Motivational</option>
          </select>
        </div>
        <div>
          <p>Author</p>
          <input
            className="input-post typeInput"
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </div>
        <div>
          <p>Text</p>
          <textarea
            id="content-textarea"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </div>

        <button className="buttonAdd" onClick={dataQoutes}>
          Add
        </button>
      </div>
    </>
  );
};
