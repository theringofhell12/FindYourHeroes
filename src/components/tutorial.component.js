import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle;
    this.onChangeDescription = this.onChangeDescription;
    this.getTutorial = this.getTutorial;
    this.updatePublished = this.updatePublished;
    this.updateTutorial = this.updateTutorial;
    this.deleteTutorial = this.deleteTutorial;

    this.state = {
      currentTutorial: {
        id: null,
        name: "",
        appearance: {weight: []},
        image: {
          url: ''
        }
      },
      message: ""
    };
  }

  componentDidMount = () => {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle = (e) => {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDescription = (e) => {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  getTutorial = (id) => {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
      })
      .catch(e => {
      });
  }

  updatePublished = (status) => {
    let data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
      })
      .catch(e => {
      });
  }

  updateTutorial = () => {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
      });
  }

  deleteTutorial = () => {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        this.props.history.push('/tutorials')
      })
      .catch(e => {
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial.id ? (
          <div className="edit-form">
            <h4>Hero</h4>
            <form>
              <div className="form-group">
                <img src={currentTutorial.images.md} />
              </div>
              <div className="form-group">
                <b htmlFor="title">Name</b>
                <p>{currentTutorial.name}</p>
              </div>
              <div className="form-group">
                <b htmlFor="description">Gender</b>
                <p>{currentTutorial.appearance.gender}</p>
              </div>
              <div className="form-group">
                <b htmlFor="description">Weight</b>
                <p>{currentTutorial.appearance.weight.join(",")}</p>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
