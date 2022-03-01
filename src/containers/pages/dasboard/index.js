import React, { Component, Fragment } from "react";
import "./dasboard.scss";
import { connect } from "react-redux";
import { addDataToAPI, deleteDataAPI, getDAtaFromApi, updateDataAPI } from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: "",
  };

  componentDidMount = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    this.props.getNotes(userData.uid);
  };

  handleSaveNote = () => {
    const { title, content, textButton } = this.state;
    const { saveNote, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    // console.log(data);
    if (textButton === "SIMPAN") {
      saveNote(data);
    } else {
      data.noteId = this.state.noteId;
      updateNotes(data);
    }
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNote = (note) => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      date: note.data.date,
      textButton: "UPDATE",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      date: "",
      textButton: "SIMPAN",
    });
  };

  deleteNote = (e, note) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    e.stopPropagation();
    this.props.deleteNotes(data);
  };

  render() {
    const { title, content } = this.state;
    const { notes } = this.props;
    // console.log("NOTES : ", notes);
    return (
      <div className="container">
        <div className="input-form">
          <input placeholder="tilte" className="input-title" value={title} onChange={(e) => this.onInputChange(e, "title")} />
          <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, "content")}></textarea>
          <div className="action-wrapper">
            {this.state.textButton === "UPDATE" ? (
              <button className="save-btn cancel" onClick={() => this.cancelUpdate()}>
                CANCEL
              </button>
            ) : (
              <div />
            )}

            <button className="save-btn" onClick={this.handleSaveNote}>
              {this.state.textButton}
            </button>
          </div>
        </div>
        <hr />

        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div className="card-content" key={note.id} onClick={() => this.updateNote(note)}>
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div className="delete-btn" onClick={(e) => this.deleteNote(e, note)}>
                    X
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => {
  return {
    userData: state.user,
    notes: state.notes,
  };
};

const reduxDispatch = (dispatch) => ({
  saveNote: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDAtaFromApi(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNotes: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
