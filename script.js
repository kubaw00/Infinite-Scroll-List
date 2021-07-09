const postContainer = document.getElementById('posts-container');
const input = document.getElementById('filter');
const loader = document.querySelector('.loader')

let limit = 5;
let page = 1;


// let API =`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`


async function getPosts() {

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = res.json();
    return data;
}

async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>    
        `;
        postContainer.appendChild(postEl)
    })

}
// display posts
showPosts();

// show loading and add new posts
function showLoading() {
    loader.classList.add('show')
    setTimeout(()=>{
        loader.classList.remove('show')
        
        setTimeout(()=> {
            page++;
            showPosts();
        }, 300)
        
    },800);

}

// filter posts 
function filterPosts(e){
    
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post')

    posts.forEach((post) => {
        const title = post.querySelector('.post-title').textContent.toUpperCase();
        const body = post.querySelector('.post-body').textContent.toUpperCase();

        if(title.includes(term) || body.includes(term)){
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })

}

document.addEventListener('input', filterPosts)


window.addEventListener('scroll', () => {
    const {scrollHeight, clientHeight, scrollTop} = document.documentElement;
     console.log(scrollHeight, clientHeight, scrollTop)
    if(scrollTop + clientHeight >= scrollHeight - 10) {
        showLoading();
    }
})