import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style/song-finder.scss";

const serialize = (obj) => { // serialize = to transform object (q i.e. query: title) to query url
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function SongLyrics(props) {
    const [song, setSong] = useState();
    const { analyse } = props //same as const analyse = props.analyse to access var (prop)
    //Or:
    // function SongLyrics({ analyse, uploadLoading }) {
    // const [song, setSong] = useState();

    //console.log({ analyse, uploadLoading })

    useEffect(() => {
        const { title/* , artist */ } = analyse

        if (title) {
            axios.get(`/geniusApi/search?${serialize({ q: title })}`, {
                headers: {
                    Authorization: 'Bearer DWHKNXSeK2CtlhsIcwSiD5iK33XzM8wwMYFJqWettjRPC1_Yz-MwCCQ64C6FhI0-' // genius developer access token
                }
            }).then(data => {
                // debugger
                const Lyrics = data.data.response.hits
                //console.log(Lyrics)
                setSong(Lyrics)
                // debugger
            });
        }
    }, [analyse]);

    return (
        <ul>
            <h3 className="section-title">Song's Lyrics</h3>
            {props.uploadLoading ? <div className="ui active transition visible inverted dimmer">
                <div className="content"><div className="ui inverted text loader">On its way too!</div></div>
            </div> : song && song.map(hit => {
                // debugger
                return <li key={hit.result.id}> <a href={hit.result.url} target="_blank" rel="noopener noreferrer">
                    {hit.result.full_title}
                </a> </li>
            })
            }
        </ul>
    );
}

export default SongLyrics;