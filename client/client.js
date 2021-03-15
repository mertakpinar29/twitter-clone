const form = document.querySelector('form');
const twitterform = document.querySelector('.twits');

const API_URL = "http://localhost:5000/tweets";
listAllTwits();

function listAllTwits(){
   
    fetch(API_URL)
        .then(response=> response.json())
        .then(twits=>{
            twits.reverse();
            twits.forEach(twit => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = twit.name;

                const contents = document.createElement('p');
                contents.textContent=twit.content;

                const date = document.createElement('small');
                date.textContent=new Date(twit.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                twitterform.appendChild(div);
            });
        })
}


form.addEventListener('submit', (event)=>{
    event.preventDefault();

    const formData = new FormData(form);

    // isim ve tweet
    const name = formData.get('name');
    const content = formData.get('content');

    const tweet = {
        name,
        content
    }
    console.log(tweet);

    fetch(API_URL,{
        method:'POST',
        body:JSON.stringify(tweet),
        headers:{
            'content-type':'application/json'
        }
    }).then(response=>response.json())
    .then(()=>{
        form.reset();
    })
})