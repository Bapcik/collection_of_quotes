import { FC, useEffect, useState } from "react";
import { ICollection } from "../interface/Interface";
import "../style/ListQuote.css";

import axios from "axios";

export const ListQuote: FC = () => {
  const [quotes, setQuotes] = useState<ICollection[]>([]);
  const [category] = useState("");
  const [loading] = useState(false);
  const [editingQuotesAuthor, setEditingQuotesAuthor] = useState("");
  const [editingQuotesText, setEditingQuotesText] = useState("");
  const [editingQuotesId, setEditingQuotesId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchListQuoteCategory = async () => {
      try {
        const response = await axios.get(
          `https://control-8-62e8e-default-rtdb.europe-west1.firebasedatabase.app/quotes.json`
        );
        const quotesData: Record<string, ICollection> = response.data;

        const quotesArray: ICollection[] = Object.entries(quotesData).map(
          ([key, value]) => ({
            id: key,
            author: value.author,
            text: value.text,
            category: value.category,
          })
        );
        setQuotes(quotesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListQuoteCategory();
  }, [category]);

  const deleteQuote = async (id: any) => {
    try {
      await axios.delete(
        `https://control-8-62e8e-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`
      );
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editQuote = async (id: string | undefined) => {
    try {
      if (id) {
        const updatedQuote = {
          ...quotes.find((quote) => quote.id === id),
          author: editingQuotesAuthor,
          text: editingQuotesText,
        };
        await axios.put(
          `https://control-8-62e8e-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`,
          updatedQuote
        );
        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote.id === id ? { ...quote, ...updatedQuote } : quote
          )
        );
        setEditingQuotesId(undefined);
        setEditingQuotesAuthor("");
        setEditingQuotesText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !quotes) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div>
      <div>
        <div className="item-container">
          {quotes.map((quote) => (
            <li key={quote.id} className="item-quote">
              <p>{quote.author}</p>
              <h3>{quote.text}</h3>
              <button
                className="delete-button"
                onClick={() => deleteQuote(quote.id)}
              >
                X
              </button>
              {editingQuotesId === quote.id ? (
                <>
                  <div className="edit-form">
                    <p>New author</p>
                    <input
                      type="text"
                      value={editingQuotesAuthor}
                      onChange={(e) => setEditingQuotesAuthor(e.target.value)}
                    />
                  </div>
                  <div className="edit-form">
                    <p>New text</p>
                    <input
                      type="text"
                      value={editingQuotesText}
                      onChange={(e) => setEditingQuotesText(e.target.value)}
                    />
                  </div>
                  <button
                    className="edit-form-button"
                    onClick={() => editQuote(quote.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingQuotesId(quote.id);
                    setEditingQuotesAuthor(quote.author);
                    setEditingQuotesText(quote.text);
                  }}
                >
                  &#9998;
                </button>
              )}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
