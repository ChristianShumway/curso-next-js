export default class extendsimport extends React.Component{
  render(){
    return(
      <div className="main">
        <h2>About Mio</h2>  
        <img src="static/platzi-logo.png" alt="logo platzi"/> 
        <p>Este es un ejemplo de como se vería mi about</p>     

        <style jsx>
          {`
            .main{
              font-family: 'Avenir', Helvetica, Arial, sans-serif;
              display: flex;
              justify-content:center;
              align-items:center;
              flex-direction: column;
              width:100%;
              height: 100vh;
            }

            img{
              max-width: 20%;
            }

            h2{
              color:white;
            }

            .main :global(p){
              color:white;
            }
          `}
        </style>

        <style jsx global>
          {`
            body{
              background: #212121;
            }
          `}
        </style>
      </div>
    )
  }
}
