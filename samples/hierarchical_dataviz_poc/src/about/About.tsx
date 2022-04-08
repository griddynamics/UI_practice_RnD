import styles from "./About.module.css";
import { SettingsIcon } from "../shared/icons";

function About() {
  return (
    <div className={styles.container}>
      <h2>Hierarchical dataviz demo</h2>
      <p>
        This app allows you to quickly evaluate different hierarchical data
        visualization options.
      </p>
      <p>Select one of the options in header to see the chart.</p>
      <p>Click "Generate random dataset" to update the data.</p>
      <p>
        Click <SettingsIcon className={styles.settingsIcon}></SettingsIcon> to
        configure the generated dataset.
      </p>
      <p>
        "Load custom dataset" allows you to load your own dataset in JSON
        format. Every node in it should have <code>name</code>,{" "}
        <code>value</code> and <code>color</code> fields. <code>children</code>{" "}
        array is for nodes under the current one.{" "}
        <a href="/example-dataset.json" target="_blank">
          Example dataset
        </a>
      </p>
    </div>
  );
}

export default About;
