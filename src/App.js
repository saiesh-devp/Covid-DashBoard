import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { findAllByTestId } from "@testing-library/react";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
//import Moment from "react-moment";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    // document.body.appendChild(script2);
    // const script = document.createElement("script");
    // script.type="text/javascript"
    // script.src = "js/myScript.js";

    // document.body.appendChild(script);
    // console.log(script);
    // console.log(script2);
    // console.log("script work done");
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((resArr) => {
        setLatest(resArr[0].data);
        setResults(resArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdatedDate = date.toLocaleDateString();
  const lastUpdatedTime = date.toLocaleTimeString();
  const filterCountry = results.filter((item) => {
    //alert(searchCountry);
    return searchCountry != ""
      ? item.country.toUpperCase().includes(searchCountry.toUpperCase())
      : item;
  });

  var queries = [
    {
      columns: 2,
      query: "min-width:500px",
    },
    {
      columns: 3,
      query: "min-width:1000px",
    },
  ];

  const countries = filterCountry.map((data, index) => {
    return (
      <Card
        key={index}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {parseInt(data.cases).toLocaleString()}</Card.Text>
          <Card.Text>Deaths: {parseInt(data.deaths).toLocaleString()}</Card.Text>
          <Card.Text>Recovered: {parseInt(data.recovered).toLocaleString()}</Card.Text>
          <Card.Text>Today's Cases: {parseInt(data.todayCases).toLocaleString()}</Card.Text>
          <Card.Text>Today's Deaths: {parseInt(data.todayDeaths).toLocaleString()}</Card.Text>
          <Card.Text>Active: {parseInt(data.active).toLocaleString()}</Card.Text>
          <Card.Text>Critical: {parseInt(data.critical).toLocaleString()}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className="app2" style = {{backgroundColor : "white"}}>
      <div id="google_translate_element" style={{ float: "right" }}></div>
    <br/>
      <h2 className="text-center">COVID-19 LIVE TRACKER</h2>
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Total Cases</Card.Title>
            <Card.Text>{parseInt(latest.cases).toLocaleString()}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>
              Last updated {lastUpdatedDate} {lastUpdatedTime}
            </small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Total Deaths</Card.Title>
            <Card.Text>{parseInt(latest.deaths).toLocaleString()}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>  Last updated {lastUpdatedDate} {lastUpdatedTime}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Total Recovered</Card.Title>
            <Card.Text>{parseInt(latest.recovered).toLocaleString()}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>  Last updated {lastUpdatedDate} {lastUpdatedTime}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={(e) => setSearchCountry(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </Form>

      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
