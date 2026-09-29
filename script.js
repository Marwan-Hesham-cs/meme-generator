let txt_box = document.querySelector('#txt_box'); //Input
let showBtn = document.querySelector('#showBtn'); //button for even listener
let gallery = document.querySelector('#gallery'); //to inject html



async function showMeme() {
      let number = Number(txt_box.value);
    
    //Check for valid input and avoid spaces!!
    if (txt_box.value.trim() === '' || !Number.isInteger(number)) {
        gallery.innerHTML = `<h1 class="text-center text-danger">Please Enter a Number!!</h1>`
        txt_box.value = ''; //Clears input 
        return null;
    } 

    txt_box.value = '';

        if (number <= 99 && number >= 0) {
            try {
            // loading screen
                gallery.innerHTML = `<div class="spinner-border" role="status">
                                     <span class="visually-hidden">Loading...</span>
                                    </div>`;
                let bk_res = await fetch('https://api.imgflip.com/get_memes'); //bk-request
                let memes = await bk_res.json(); //data parsed

                //index of the selected meme, we use .data to access the memes from the object 'data'
                let sel_meme = memes.data.memes[number];

                gallery.innerHTML = `
            <div class=" justify-content-center w-50 h-25">
  <div class="card-body">
    <h5 class="card-title text-warning fs-2">${sel_meme.name}</h5>
  </div>
  <img src="${sel_meme.url}" class="card-img-bottom" alt="...">
</div>
`;


            } catch (error) {
                gallery.innerHTML = `<div class="alert alert-danger" role="alert">No luck to laugh :( </div>`;
            }

        } else {
            gallery.innerHTML = `<h1 class="text-danger">Please Enter Valid Number</h1>`
        }
    }



showBtn.addEventListener('click', showMeme )

txt_box.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.key === 'Enter')
        
        showMeme();
} )






