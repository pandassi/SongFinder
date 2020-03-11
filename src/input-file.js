import React from "react";
import "./style/song-finder.scss";

class InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    const filename = this.props.value ? this.props.value.name : "";
    this.state = {
      filename: filename,
      url: ""
    };
  }

  placeholder() {
    return (
      this.state.filename ||
      this.props.placeholder ||
      "MP3 or WAV files only."
    );
  }

  clickFileInput = event => {
    event.preventDefault();
    this.fileInputRef.current.click();
  };

  handleFileInputChange = event => {
    this.props.fileInputChange(event.target.files[0]);

    if (this.props.keepfilename) {
      const filename = event.target.files.length
        ? event.target.files[0].name
        : "";
      this.setState({
        filename: filename,
        url: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  render() {
    //let url = `${this.state.mediaId}/${this.state.type}`
    // debugger
    return (
      <div className="section">
        <div className="file-input-container">
          <div className="ui button" onClick={this.clickFileInput}>
            Click here to upload your song
        </div>
          <div className={`placeholder`}>{this.placeholder()}</div>
          <input
            ref={this.fileInputRef}
            className="hidden"
            type="file"
            accept=".mp3,.wav, audio/mp3, audio/wav"
            onChange={this.handleFileInputChange}
          />
        </div>
        <div className="audio">
          <audio src={this.state.url} controls />
        </div>
      </div>
    );
  }
}
export default InputFile;
