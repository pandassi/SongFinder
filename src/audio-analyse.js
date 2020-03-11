import React from "react";
// import { journal } from "../application";
import axios from "axios";
import { toast } from "react-toastify";
import InputFile from "./input-file"

function AudioAnalyse(props) {

  const [accessAudio/* , setAccesAudio */] = React.useState();

  //console.log({ isUp: props.uploadLoading })

  function handleChange(file) {
    // POST
    //console.log("file input change");
    //console.log(file);

    let fd = new FormData();
    fd.append("file", file);
    let mediaId;
    fd.append("mediaId", mediaId);
    props.setUploadLoading(true)
    axios.post(`http://envoi.smartsplit.org:3033/envoi`, fd).then(res => {
      //console.log("1");
      props.setUploadLoading(false)
      let f = res.data;
      if (f.music.err) {
        //debugger
        switch (f.music.err) {
          case "AUDIO-MAUVAISE-LECTURE":
            toast.warn(
              "Wrong file please try another one."
            );
            break;
          case "AUDIO-INCONNU":
            toast.warn("No match found for the submitted file.");
            break;
          default:
            toast.warn(f.music.err);
        }
      }
      //console.log("2");
      if (f && !f.music.err) {
        //console.log("3");
        let analyse = f.music[0]; // NB. No more than one result
        let access = accessAudio ? accessAudio : "private";
        props.setFieldValue("files", [
          { file: f.name, md5: f.uuid, access: access }
        ]);
        props.setFieldValue("analyse", analyse);
      } else {
        //console.log("4");
        let files = [];
        let access = accessAudio ? accessAudio : "private";
        files.push({ file: file.name, access: access });
        props.setFieldValue("files", files);
      }
    }
    ).catch(err => {
      if (err) {
        if (file)
          // eslint-disable-next-line 
          toast.error((`${file.name}` + "failed to transfer."))
      }
    })
  }


  return (
    <div className="section">
      <InputFile
        fileInputChange={handleChange}
        keepfilename={true}
      />
    </div>
  );
}

export default AudioAnalyse;
