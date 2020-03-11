import React from "react";
import { Popup, Icon, Grid } from 'semantic-ui-react';
import SongLyrics from "./song-lyrics"
import "./style/song-finder.scss";

function AudioOutput(props) {

  //console.log({ x: props.uploadLoading })
  //console.log(props.analyse);

  return (
    <>
      <Grid.Column>
        <div className="section">
          <ul><h3 className="section-title">Song Information</h3></ul>
          {props.uploadLoading ? <div className="ui active transition visible inverted dimmer">
            <div className="content"><div className="ui inverted text loader">On its way!</div></div>
          </div> : <div className="labelStyle">
              <ul>Title: {props.analyse.title}</ul>
              <ul>Artist: {props.analyse.artists &&
                props.analyse.artists[0] &&
                props.analyse.artists[0].name}
              </ul>
              <ul>Label: {props.analyse.label}</ul>
              <ul>Album: {props.analyse.album && props.analyse.album.name}</ul>
              <ul>ISRC&nbsp;
                  <Popup
                  className="popup"
                  trigger={<Icon className="question circle outline icon custom" />}
                  content='The International Standard Recording Code (ISRC) allows the identification of audio recordings (tracks).'
                  hideOnScroll
                />: {props.analyse.external_ids && props.analyse.external_ids.isrc}</ul>
              <ul>Release Date: {props.analyse.release_date}</ul>
            </div>}
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className="section">
          <SongLyrics
            analyse={props.analyse}
            lyrics={props.lyrics}
            uploadLoading={props.uploadLoading}
          />
        </div>
      </Grid.Column>
    </>

  );
}

export default AudioOutput;
