import Snowfall from './component/snow';
import style from './component/app.module.css'
function App() {
  return (
   
    <div className={style.App }>
     <Snowfall />
      <header className={style.Header}>
    
      <img className={style.Logo } src="./chat-bot.png" alt="logo" />
      <h1 className={style.Title }>AI chatBot</h1>
      </header>
     <div className={style .ChatContainer }></div>
    </div>
  );
}

export default App;
