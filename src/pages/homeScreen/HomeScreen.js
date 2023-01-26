import React from "react";
import "./HomeScreen.scss";
import Nav from "../../components/nav/Nav";
import Banner from "../../components/banner/Banner";
import requests from "../../utils/Requests";
import Row from "../../components/Row/Row";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />{" "}
      <Row
        title="Treding Now"
        fetchUrl={requests.fetchTreding}
      />{" "}
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
      />{" "}
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />{" "}
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />{" "}
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />{" "}
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />{" "}
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default HomeScreen;
