import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle;
    this.retrieveTutorials = this.retrieveTutorials;
    this.refreshList = this.refreshList;
    this.setActiveTutorial = this.setActiveTutorial;
    this.removeAllTutorials = this.removeAllTutorials;
    this.searchTitle = this.searchTitle;

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        if (response.data) {
          this.setState({
            tutorials: response.data
          });
        }

      })
      .catch(e => {
      });
  }

  refreshList = () => {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial = (tutorial, index) => {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials = () => {
    TutorialDataService.deleteAll()
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
      });
  }

  searchTitle = () => {
    TutorialDataService.findByTitle()
      .then(response => {
        if (response.data.error) {
          this.setState({
            tutorials: []
          });
          return;
        }

        if (response.data) {
          this.setState({
            tutorials: response.data.filter(res => res.name.includes(this.state.searchTitle))
          });
        }
      })
      .catch(e => {
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Hero List</h4>

<button
  className="m-3 btn btn-sm btn-danger"
>
  Create new hero
</button>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  <img width={50} height={50}  src={tutorial.images.lg} alt={tutorial.name} />
                  {tutorial.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Show All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {  currentTutorial.name}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>{" "}
                {currentTutorial.appearance.gender}
              </div>
              <div>
                <label>
                  <strong>Weight:</strong>
                </label>{" "}
                {currentTutorial.appearance.weight.join(",")}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                View detail
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a hero...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
