const Home = () => {

  const Auth = localStorage.getItem("authenticated");
  const fn =localStorage.getItem("fn")

  if (Auth === "false")
  {
    return <h1>Welcome To Website</h1>;
  }
  else
  {
    return <h1>Hello  {fn}  !!!</h1>
  }
  };
  
  export default Home;