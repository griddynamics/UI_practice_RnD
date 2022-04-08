import {
  PropsWithChildren,
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import styles from "./FileInput.module.css";
import classnames from "classnames";
import {
  ChartData,
  isChartDataEntry,
  ChartDataEntry,
  countChartDataEntries,
} from "./dataset";
import ReactTooltip from "react-tooltip";

const ERROR_MESSAGES = {
  INVALID_JSON: "Can't parse the file, invalid JSON",
  INVALID_DATA: "Dataset inside file is invalid",
  INVALID_FILE_TYPE: "File should be .json",
  CANT_LOAD: "Can't load the file",
  UNKNOWN: "Something went wrong",
};

export interface Props {
  onChange: (dataset: ChartData) => void;
  className?: string;
}

function readFileAsync(file: File): Promise<ChartDataEntry> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = (event) => {
      let dataset;

      try {
        dataset = JSON.parse(event?.target?.result as string);
      } catch (error) {
        reject(new Error(ERROR_MESSAGES.INVALID_JSON));
      }

      if (!isChartDataEntry(dataset)) {
        reject(new Error(ERROR_MESSAGES.INVALID_DATA));
      }

      resolve(dataset);
    };

    reader.onerror = () => reject(new Error(ERROR_MESSAGES.CANT_LOAD));

    reader.readAsText(file);
  });
}

function FileInput({
  children,
  className,
  onChange,
}: PropsWithChildren<Props>) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!validationError) {
      return;
    }

    labelRef.current && ReactTooltip.show(labelRef.current);
    const timer = setTimeout(() => {
      labelRef.current && ReactTooltip.hide(labelRef.current);
      setValidationError(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [validationError]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event?.target?.files && event?.target?.files[0];

        if (!file || file.type !== "application/json") {
          throw new Error(ERROR_MESSAGES.INVALID_FILE_TYPE);
        }

        const data = await readFileAsync(file);
        const nodesCount = countChartDataEntries(data);
        setValidationError(null);
        onChange({ data, nodesCount });
      } catch (error) {
        let message = ERROR_MESSAGES.UNKNOWN;
        if (error instanceof Error) {
          message = error.message;
        }
        setValidationError(message);
      } finally {
        event.target.value = "";
      }
    },
    []
  );

  return (
    <label
      ref={labelRef}
      className={classnames([className, styles.label])}
      data-tip={validationError}
    >
      <input type="file" className={styles.input} onChange={handleFileChange} />
      {children}
      <ReactTooltip
        place="bottom"
        type="error"
        effect="solid"
        textColor="#FFF"
        backgroundColor="#B81327"
      />
    </label>
  );
}

export default FileInput;
