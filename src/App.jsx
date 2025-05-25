import Header from "./components/Header";
import Footer from "./components/Footer";
import React,{ lazy,Suspense } from "react";
import Loading from "./components/Loading";
const Main = lazy(()=>import('./components/Main'));
const App = ()=>{
  return(
    <>
        
        <Header/>
        <Suspense fallback={<Loading/>}>
          <Main/>
        </Suspense>
        <Footer/>
        
    </>
  )
}

export default App
