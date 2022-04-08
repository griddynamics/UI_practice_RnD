import { Outlet } from "react-router-dom";
import NavLink from "./NavLink";
import styles from "./MainLayout.module.css";
import FileInput, { Props as FileInputProps } from "./FileInput";
import RandomDataGenerator, {
  Props as RandomDataGeneratorProps,
} from "./RandomDataGenerator";
import { QuestionIcon } from "./icons";
export interface Props {
  onFileChange: FileInputProps["onChange"];
  onRandomDataGenerate: RandomDataGeneratorProps["onGenerate"];
  nodesCount: RandomDataGeneratorProps["nodesCount"];
}

function MainLayout({ onFileChange, onRandomDataGenerate, nodesCount }: Props) {
  return (
    <div className={styles.layoutRoot}>
      <nav className={styles.nav}>
        <NavLink className={styles.navLink} to="/icicle">
          Icicle
        </NavLink>
        <NavLink className={styles.navLink} to="/sunburst">
          Sunburst
        </NavLink>
        <NavLink className={styles.navLink} to="/treemap">
          Treemap
        </NavLink>
        <NavLink className={styles.navLink} to="/circular-treemap">
          Circular treemap
        </NavLink>
        <div className={styles.rightSection}>
          <RandomDataGenerator
            className={styles.randomDataGenerator}
            onGenerate={onRandomDataGenerate}
            nodesCount={nodesCount}
          >
            Generate random dataset
          </RandomDataGenerator>
          <FileInput className={styles.fileInput} onChange={onFileChange}>
            Load custom dataset
          </FileInput>
          <NavLink className={styles.navLink} to="/about">
            <QuestionIcon className={styles.questionIcon}></QuestionIcon>
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default MainLayout;
