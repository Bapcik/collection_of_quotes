import { NavLink, Route, Routes } from "react-router-dom";
import "./Navigation.css";
import { ListQuote } from "../components/ListQuote";
import { AddQuote } from "../components/AddQuote";
import { CategoryQuote } from "../components/CategoryQuote";

export const Navigation = () => {
  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/category">Сategory</NavLink>
          </li>
          <li>
            <NavLink to="/quote/add">Submit new quote</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ListQuote />} />
        <Route path="/category" element={<CategoryQuote />} />
        <Route path="/category/star-wars" element={<CategoryQuote />} />
        <Route path="/category/famous-people" element={<CategoryQuote />} />
        <Route path="/category/saying" element={<CategoryQuote />} />
        <Route path="/category/humour" element={<CategoryQuote />} />
        <Route path="/category/motivational" element={<CategoryQuote />} />
        <Route path="/quote/add" element={<AddQuote />} />
      </Routes>
    </div>
  );
};
