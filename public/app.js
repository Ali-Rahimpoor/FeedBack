//Elements
const textarea = document.querySelector('#textarea');
const counter = document.querySelector('#counter');
const submit_btn = document.querySelector('#submit-btn');
const comment_form = document.querySelector('#comment-form');


// In Start Application
fetchData();


// Method
const AddClassList=(El,ClassName)=>{
    return El.classList.add(ClassName);
}
const RemoveClassList=(El,ClassName)=>{
    return El.classList.remove(ClassName);
}

const SetRemoveTime=(El,ClassName,Sec)=>{
    return setTimeout(()=>{
        return El.classList.remove(ClassName);
    },Sec)
}

// Function

const Textarea_Input = ()=>{
let text = textarea.value;
let textLength = text.length;

counter.textContent = 150 - textLength;
if(textLength >= 130){
    counter.classList.add('text-red-400');
}else{
    counter.classList.remove('text-red-400');
}
};
const Textarea_Focus = ()=>{
textarea.parentElement.classList.toggle('outline');
textarea.parentElement.classList.toggle('outline-zinc-600');

}


const Submit_btn_Click = (e)=>{
    e.preventDefault();
    ValidInput();
    ReceiveUserInformation();
    // IN Receive SendInfo
}

function ValidInput(){
let text =textarea.value;
let textLength = text.length;
let form = textarea.parentElement;
if(text.includes("#") && textLength > 5){
    AddClassList(form,"textarea--valid");
    SetRemoveTime(form,"textarea--valid",1000);
}else{
    AddClassList(form,"textarea--invalid");
    SetRemoveTime(form,"textarea--invalid",1000);
    textarea.placeholder="your comment at least need 5 characters and do not forget (#)"
    textarea.value='';
    counter.textContent='150';
}

}
function ReceiveUserInformation(){
    // comment
    const text = textarea.value;
    // finding hashtag
    const hashtag = text.split(' ').find(word => word.includes('#'));
    // the Company name
    const company = hashtag.replace('#','').toUpperCase();
    // first letter of company
    const badgeLetter = company.substring(0,1);
    const upVoteCount = 0;
    const dayAgo=0;
    
    const comment =` <div class="comment-item">
                <!-- Vote -->
                <div class="vote">
                    <svg class="size-3"><use href="#like-icon"></use></svg>
                    <p class="upVoteCount">${upVoteCount}</p>
                </div>
                <!-- BadgeLetter -->
                <div class="badge-letter">
                    <h1 class="badgeLetter">${badgeLetter}</h1>
                </div>
                <!-- comment -->
                <div class="comment">
                    <div>
                        <h1 class="comment-title">${company}</h1>
                    </div>
                    <div>
                        <p class="comment-text">${text}</p>
                    </div>
                </div>
                <!-- date -->
                <div class="date">
                    <h1>${dayAgo ==0 ? "NEW" : dayAgo}</h1>
                </div>
            </div>`;
            SendInformation(comment,text,hashtag,company,badgeLetter,upVoteCount,dayAgo);
}
function SendInformation(comment,text,hashtag,company,badgeLetter,upvoteCount,dayAgo){
comment_form.insertAdjacentHTML('afterbegin',comment);
textarea.value="";
counter.textContent="150";
// UpvoteRefresh();

const comment_obj = {
  text:text,
  hashtag:hashtag,
  company:company,
  badgeLetter:badgeLetter,
  upvoteCount,upvoteCount,
  daysAgo:dayAgo
}
fetch(`https://bytegrad.com/course-assets/js/1/api/feedbacks`, {
    method: 'POST',
    body: JSON.stringify(comment_obj),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (!response.ok) {
        // console.log('Something went wrong');
        return;
    }
    // console.log('Successfuly submitted');
}).catch(error => console.log(error));
}


function fetchData(){
    fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
.then(res =>{return res.json();}).then(data=>{  
     const spinner = document.querySelector('.spinner');
     spinner.classList.add('hidden');
     console.log(data);
     
   data.feedbacks.forEach(item=>{
    const comment=
    ` <div class="comment-item">
                <!-- Vote -->
                <div class="vote">
                    <svg class="size-3"><use href="#like-icon"></use></svg>
                    <p class="upVoteCount">${item.upvoteCount}</p>
                </div>
                <!-- BadgeLetter -->
                <div class="badge-letter">
                    <h1 class="badgeLetter">${item.badgeLetter}</h1>
                </div>
                <!-- comment -->
                <div class="comment">
                    <div>
                        <h1 class="comment-title">${item.company}</h1>
                    </div>
                    <div>
                        <p class="comment-text">${item.text}</p>
                    </div>
                </div>
                <!-- date -->
                <div class="date">
                    <h1>${ item.daysAgo=0 ? "NEW" : item.daysAgo}d</h1>
                </div>
            </div>`;
        comment_form.insertAdjacentHTML('beforeend',comment);
       
   })
//    UpvoteRefresh();
}).catch(er=>{
    comment_form.insertAdjacentHTML('beforeend',`
        Error => ${er.message}`);
});

}

// function UpvoteRefresh(){
//     const upVoteCount = document.querySelectorAll('.upVoteCount');
//     console.log(upVoteCount);

//     for (let i = 0; i < upVoteCount.length; i++) {
//         // upVoteCount[i].replaceWith(upVoteCount[i].cloneNode(true));
//         upVoteCount[i].addEventListener('click',()=>{
//             +upVoteCount[i].textContent++;
//         })
//     }
// }
//EventListener
function UpvoteClick(e){
    if (e.target.classList.contains('upVoteCount')) {
        e.target.textContent = +e.target.textContent + 1;
    }
}

textarea.addEventListener('input',Textarea_Input);
textarea.addEventListener('focus',Textarea_Focus);
textarea.addEventListener('blur',Textarea_Focus);

submit_btn.addEventListener('click',Submit_btn_Click);

comment_form.addEventListener('click',UpvoteClick)
