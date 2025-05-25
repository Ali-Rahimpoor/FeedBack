import { useState,useRef,useEffect } from "react";
import { useAddCommentMutation } from "../features/apiSlice";

const Header = ()=>{
    const [badgeLetter,setBadgeLetter] = useState('');
    const [company,setCompany] = useState('');
    const [text,setText] = useState('');
    const [addComment] = useAddCommentMutation();

    const remainCharRef = useRef(150);
    const counterElement = useRef(null);


    const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    remainCharRef.current = 150 - inputText.length;
    
    // به روزرسانی DOM مستقیماً بدون رندر مجدد
    if (counterElement.current) {
      counterElement.current.textContent = remainCharRef.current;
      
      // تغییر رنگ اگر کاراکترهای باقیمانده کم باشد
      if (remainCharRef.current < 20) {
        counterElement.current.classList.add('text-rose-400');
      } else {
        counterElement.current.classList.remove('text-rose-400');
      }
    }
  };


const handleClickSubmit = async () => {
  if (text.includes("#") && text.length > 5) {
    const hashtag = text.split(" ").find((word) => word.includes("#"));
    const companyName = hashtag.replace("#", "").toUpperCase();
    const badge = companyName.substring(0, 1);

    const payload = {
      text,
      badgeLetter: badge,
      company: companyName,
    };
    // console.log("Sending to API:", payload); 
    try {
      await addComment(payload).unwrap();
      setCompany('');
      setBadgeLetter('');
      setText('')
      counterElement.current.textContent = 150;
    } catch (err) {
      console.error("Submit failed:", err);
    }
  } else {
    setText("Err");
  }
};



   return(
      <header className="sm:mt-12 font-Karla">
     <div className="relative overflow-x-hidden w-[100%] sm:w-[640px] sm:rounded-t-lg bg-zinc-900 text-white pt-12 pb-6 mx-auto flex flex-col items-center justify-center">
       <div className="header-top-bg"></div>
    <h1 className="sm:text-4xl  text-2xl font-Funnel">Give Feedback. <span className="font-Montserrat-Light text-base sm:text-xl">Publicly.</span></h1>
   
    <div className="shadow border border-gray-800 w-[299px] sm:w-[400px] h-[150px] sm:h-[140px] rounded-md bg-zinc-700 mt-9 flex flex-col items-center justify-between p-2">
        <textarea value={text} onChange={handleTextChange} id="textarea" className="text-zinc-200 text-sm font-Inter focus:outline-none resize-none bg-zinc-700 w-full  flex-grow placeholder:text-zinc-400 sm:placeholder:text-base" maxLength="150"  placeholder="Enter Your feedback hear, remember to #hashtag the company!"></textarea>
        
        <div className="flex justify-between w-full px-2 items-center">
            <p id="counter" ref={counterElement} className="sm:text-sm text-xs font-Inter-Light ">150</p>
            <button id="submit-btn" onClick={()=>handleClickSubmit()} className="bg-white cursor-pointer hover:bg-zinc-300 text-zinc-800 p-2 rounded-3xl font-Inter sm:text-base text-sm transition-all hover:scale-105">Submit</button>
        </div>
    </div>
   </div>
 </header>
   )
}
export default Header;