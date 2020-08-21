import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import Moment from "react-moment";
import MovieNightPic from "./Movie-Night-Flyer.jpg";

export default function FavoriteMovie(props) {
  return (
    <div className="container-fluid">
      <div className="Row">
        <div className="col-md-12 d-flex flex-wrap justify-content-center">
          {props.favoriteMovie.map((item) => {
            return (
              <div>
                <Card id="card" className="bg-dark text-white">
                  <Card.Img
                    id="card-image"
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                        : MovieNightPic
                    }
                    alt="Card image"
                  />
                  <Card.ImgOverlay>
                    <div id="card-content">
                      <Card.Title className="mb-3">
                        <a
                          id="item-title"
                          href={`https://www.themoviedb.org/movie/${item.id}?language=en-US`}
                        >
                          {item.title}
                        </a>
                      </Card.Title>
                      <Card.Text className="mb-2">
                        {item.genre_ids.map((movieId) => {
                          return (
                            <Badge pill className="mr-2" variant="danger">
                              {
                                props.genreList.find(
                                  (genre) => genre.id === movieId
                                ).name
                              }
                            </Badge>
                          );
                        })}
                      </Card.Text>
                      <Card.Text>Ratings: {item.vote_average}</Card.Text>
                      <Card.Text>
                        Release Date:{" "}
                        <Moment format="D MMM YYYY" withTitle>
                          {item.release_date}
                        </Moment>
                      </Card.Text>
                      <Card.Text>
                        <Button
                          variant="outline-danger"
                          onClick={() => props.deleteFavorite(item.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outline-success"
                          onClick={() => props.searchYoutube(item.id)}
                        >
                          View Trailer
                        </Button>
                      </Card.Text>
                      <Card.Text>
                        <div id="overview-text">{item.overview}</div>
                      </Card.Text>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
