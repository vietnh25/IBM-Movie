import React, { useState } from "react";
import { Nav, Navbar, NavDropdown, Form, FormControl } from "react-bootstrap";

export default function NavigationBar(props) {
  let [inputValue, setInputValue] = useState("");
  return (
    <Navbar
      collapseOnSelect
      className="sticky-top"
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={props.popCornLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Smith's Movie Night
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="d-flex flex-row-reverse" href="#about">
            About
          </Nav.Link>
          <NavDropdown
            className="d-flex flex-row-reverse"
            title="Trending"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item
              onClick={() => props.getTrendMovie("now_playing")}
            >
              Currently Showing
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getTrendMovie("upcoming")}>
              Upcoming
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getTrendMovie("top_rated")}>
              Top Rated
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="d-flex flex-row-reverse"
            title="Sort by"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => props.sortByRating(-1)}>
              Ratings (Highest)
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.sortByRating(1)}>
              Ratings (Lowest)
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => props.sortByRating(0)}>
              Reset
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="d-flex flex-row-reverse"
            title="Genres"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("28")}>
              Action
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("16")}>
              Animation
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("35")}>
              Comedy
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("80")}>
              Crime
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("99")}>
              Documentary
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("18")}>
              Drama
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("14")}>
              Fantasy
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("36")}>
              History
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("27")}>
              Horror
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("878")}>
              Science Fiction
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("10752")}>
              War
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("37")}>
              Western
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => props.getDiscoverGenre("")}>
              All
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Form
            inline
            onSubmit={(event) => {
              event.preventDefault();
              props.searchByKeyword(inputValue, event);
              setInputValue("");
            }}
          >
            <FormControl
              className="d-flex flex-row-reverse mr-sm-2"
              type="text"
              value={inputValue}
              placeholder="Search your movie here..."
              onChange={(event) => setInputValue(event.target.value)}
            />
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
