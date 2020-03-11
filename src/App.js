import React, { useEffect/* , useState */ } from "react";
import { Formik } from "formik";
import AudioAnalyse from "./audio-analyse";
import AudioOutput from "./audio-output";
import { Grid } from "semantic-ui-react"
import "./style/song-finder.scss";

function Form(props) {
  const [uploadLoading, setUploadLoading] = React.useState(false);
  //const [uploadLyrics, setUploadLyrics] = React.useState(false);

  useEffect(() => {
    //console.log("files changed");
    //console.log(props.formik.values.analyse);
  }, [props.formik.values.analyse]);

  return (
    <>
      <h1 id="title">Upload and Get the Information of Any Song</h1>
      <Grid columns={3}> {/* Dear Semantic UI, if you set Grid.Columns to {15} and each of the 3 Grid.Column to {5}, you will find a bug in your library. */}
        <Grid.Row>
          <Grid.Column>
            <AudioAnalyse
              setFieldValue={props.formik.setFieldValue}
              uploadLoading={uploadLoading}
              setUploadLoading={setUploadLoading}
            />
          </Grid.Column>

          <AudioOutput
            analyse={props.formik.values.analyse}
            uploadLoading={uploadLoading}
          />
        </Grid.Row>
      </Grid>
    </>
  );
}

function App() {
  //console.log("hello");
  return (
    <div>
      <Formik
        initialValues={{ files: null, analyse: {} }}
        onSubmit={v => console.log(v)}
      >
        {formik => <Form formik={formik} />}
      </Formik>
    </div>
  );
}

export default App;
