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
        title="ORIGINAL NETFLIX"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />{" "}
      <Row
        title="Tendência agora"
        fetchUrl={requests.fetchTreding}
      />{" "}
      <Row
        title="Mais vistos"
        fetchUrl={requests.fetchTopRated}
      />{" "}
      <Row
        title="Ação"
        fetchUrl={requests.fetchActionMovies}
      />{" "}
      <Row
        title="Comédia"
        fetchUrl={requests.fetchComedyMovies}
      />{" "}
      <Row
        title="Terror/Suspense"
        fetchUrl={requests.fetchHorrorMovies}
      />{" "}
      <Row
        title="Romance"
        fetchUrl={requests.fetchRomanceMovies}
      />{" "}
      <Row
        title="Documentários"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default HomeScreen;
