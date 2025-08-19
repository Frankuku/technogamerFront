import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productos?buscar=${query}`);
    } else {
      navigate(`/productos`); // 👉 si está vacío vuelve a mostrar todo
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-3">
      <InputGroup style={{ maxWidth: "600px" }}>
        <Form.Control
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" type="submit">
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
