import {
  PropsWithChildren,
  useCallback,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import styles from "./RandomDataGenerator.module.css";
import classnames from "classnames";
import {
  RandomDataGenerationParams,
  DEFAULT_LEVELS,
  DEFAULT_MIN_CHILDREN,
  DEFAULT_MAX_CHILDREN,
} from "./dataset";
import { Portal } from "react-portal";
import useResizeObserver from "@react-hook/resize-observer";
import { SettingsIcon } from "./icons";

interface InputProps {
  id: string;
  value: number;
  setter: (value: number) => void;
}

function Input({ id, value, setter, children }: PropsWithChildren<InputProps>) {
  const handleChange = useCallback(
    (event: ChangeEvent) => {
      const intValue = Number(
        (event.target as HTMLInputElement).value.replace(/\D/, "")
      );
      setter(intValue);
    },
    [setter]
  );

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <div className={styles.inputContainer}>
        <button
          className={styles.inputDecrement}
          onClick={() => setter(--value)}
        >
          -
        </button>
        <input
          id={id}
          className={styles.input}
          value={value}
          onFocus={(event) => event.target.select()}
          onChange={handleChange}
        />
        <button
          className={styles.inputIncrement}
          onClick={() => setter(++value)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export interface Props {
  onGenerate: (params: RandomDataGenerationParams) => void;
  nodesCount: number;
  className?: string;
}

function RandomDataGenerator({
  children,
  className,
  onGenerate,
  nodesCount,
}: PropsWithChildren<Props>) {
  const [levels, setLevels] = useState<number>(DEFAULT_LEVELS);
  const [minChildren, setMinChildren] = useState<number>(DEFAULT_MIN_CHILDREN);
  const [maxChildren, setMaxChildren] = useState<number>(DEFAULT_MAX_CHILDREN);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settingsFormPosition, setSettingsFormPosition] = useState<{
    top: number;
    right: number;
  }>({ top: 0, right: 0 });
  const [settingsOverlayElement, setSettingsOverlayElement] =
    useState<HTMLDivElement | null>(null);

  const settingsOverlayRef = useCallback((element) => {
    setSettingsOverlayElement(element);
  }, []);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const handleGenerate = useCallback(() => {
    onGenerate({ levels, minChildren, maxChildren });
  }, [onGenerate, levels, minChildren, maxChildren]);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const getInputSetter = (setter: (value: number) => void) => {
    return (value: number) => {
      setter(value);
      handleGenerate();
    };
  };

  useResizeObserver(settingsOverlayElement, () => {
    if (settingsButtonRef.current) {
      setSettingsFormPosition({
        right: Math.max(
          window.innerWidth -
            settingsButtonRef.current.getBoundingClientRect().right,
          8
        ),
        top: settingsButtonRef.current.getBoundingClientRect().bottom + 6,
      });
    }
  });

  return (
    <div className={classnames([styles.container, className])}>
      <button className={styles.generateButton} onClick={handleGenerate}>
        {children}
      </button>
      <button
        ref={settingsButtonRef}
        className={classnames([
          styles.settingsButton,
          { [styles.settingsButtonActive]: isSettingsOpen },
        ])}
        onClick={toggleSettings}
      >
        <SettingsIcon className={styles.settingsIcon}></SettingsIcon>
      </button>
      {isSettingsOpen && (
        <Portal>
          <div
            ref={settingsOverlayRef}
            className={styles.settingsOverlay}
            onClick={toggleSettings}
          >
            <div
              className={styles.settingsForm}
              style={{
                right: settingsFormPosition.right,
                top: settingsFormPosition.top,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <Input
                id="levels"
                value={levels}
                setter={getInputSetter(setLevels)}
              >
                Tree depth
              </Input>
              <Input
                id="minChildren"
                value={minChildren}
                setter={getInputSetter(setMinChildren)}
              >
                Min node children
              </Input>
              <Input
                id="maxChildren"
                value={maxChildren}
                setter={getInputSetter(setMaxChildren)}
              >
                Max node children
              </Input>
              <div className={styles.field}>
                <span className={styles.label}>Total nodes count</span>
                <span className={styles.label}>{nodesCount}</span>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default RandomDataGenerator;
