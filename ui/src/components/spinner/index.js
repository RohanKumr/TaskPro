import { COLOR } from "../../utils/colors";

const Spinner = () => (
  <div style={ styles.container }>
    <div style={ styles.loader }></div>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%"
  },
  loader: {
    border: '4px solid #f3f3f3',
    borderTop: `4px solid ${COLOR.PRIMARY}`,
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    animation: 'spin 1s linear infinite',
  },
};

export default Spinner;
