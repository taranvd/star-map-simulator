import SkySimulation from './SkySimulator/SkySimulator';

const style = {
  margin: '0 auto',
  maxWidth: '1200px',
  textAlign: 'center',
};

export const App = () => {
  return (
    <div style={style}>
      <h1 style={{ color: 'white' }}>Simulator by TRNVD 🥷</h1>
      <SkySimulation />
    </div>
  );
};
