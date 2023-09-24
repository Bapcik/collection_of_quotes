import { FC, useEffect, useState } from "react";
import { ICollection } from "../interface/Interface";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const CategoryQuote: FC = () => {
  const [quotes, setQuotes] = useState<ICollection[]>([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchListQuoteCategory = async () => {
      try {
        const response = await axios.get(
          `https://control-8-62e8e-default-rtdb.europe-west1.firebasedatabase.app/quotes.json?orderBy="category"&equalTo="${category}"`
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

  return (
    <div>
      <div className="category">
        <li>
          <NavLink
            to="/category/star-wars"
            onClick={() => setCategory("star-wars")}
          >
            Star Wars
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/famous-people"
            onClick={() => setCategory("famous-people")}
          >
            Famous People
          </NavLink>
        </li>
        <li>
          <NavLink to="/category/saying" onClick={() => setCategory("saying")}>
            Saying
          </NavLink>
        </li>
        <li>
          <NavLink to="/category/humour" onClick={() => setCategory("humour")}>
            Humour
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/motivational"
            onClick={() => setCategory("motivational")}
          >
            Motivational
          </NavLink>
        </li>
      </div>
      {quotes && quotes.length > 0 ? (
        <div>
          {quotes.map((quote) => (
            <li key={quote.id}>
              <p>{quote.author}</p>
              <h3>{quote.text}</h3>
            </li>
          ))}
        </div>
      ) : (
        <p>No quotes found.</p>
      )}
    </div>
  );
};
