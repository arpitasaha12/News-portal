const loadNewsCategory = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => showNewsCategory(data.data.news_category))
        .catch(error => console.log(error))
}

const showNewsCategory = (allData) => {
    const newsCategory = document.getElementById("news-category")
    for (const data of allData) {

        const div = document.createElement('div')
        div.classList.add("d-inline-flex", "px-4")
        div.innerHTML = `
        
        <h6 onclick="loadNews('${data.category_id}','${data.category_name}')" style="hover:pointer">${data.category_name} </h6>
        `
        newsCategory.appendChild(div)
    }
}



const loadNews = (id, name) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data, name))
        .catch(error => console.log(error))
    const spinner = document.getElementById("spinner")
    spinner.classList.remove("d-none")


}
const showNews = (dataAll, name) => {
    const newsCard = document.getElementById("news-card")
    const countMsg = document.getElementById("count-msg")
    const spinner = document.getElementById("spinner")


    const sortedResponse = dataAll.sort(function (a, b) {
        if (a === b) {
            return 0;
        }

        if (a === null) {
            return 1;
        }
        if (b === null) {
            return -1;
        }

        return a.total_view < b.total_view ? 1 : -1


    });



    newsCard.innerHTML = ``


    if (dataAll && name) {

        countMsg.classList.remove("d-none")
        countMsg.innerHTML = `
        <h3>${sortedResponse.length} news found for ${name}</h3>
        `
        if (`${sortedResponse.length}` == 0) {
            spinner.classList.add("d-none")
            countMsg.innerHTML = `
        <h3>No news found for ${name}</h3>
        `
        }
    }
    else {
        countMsg.classList.add("d-none")
        newsCard.innerHTML = ""
        spinner.classList.add("d-none")
    }



    sortedResponse.forEach(each => {
        const { author, details, thumbnail_url, title, total_view } = each
        const { name, img } = author

        const div = document.createElement('div')
        div.classList.add('card', 'mb-3', 'border-0', 'bg-light')
        div.innerHTML = `
        <div class="row g-0 ">
        <div class="col-md-3" >
                        <img src="${thumbnail_url}" class="img-fluid rounded-start w-100 m-3" style="height: 300px;" "alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body ms-5 mt-5" >
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details.length > 250 ? details.slice(0, 250) + "..." : details}</p>
                               <div class="d-flex mt-5">
                            <div class="d-flex align-items-center  w-25">
                            <img src="${img}" class="rounded-circle"
                                style="height: 50px; width:50px;" alt="">
                                <div class="ms-2">
                                <p class="mb-0 mt-2 me-5">${name ? name : "No name found"}</p>
                           </div>
                            
                        </div>

                        <div class="d-flex align-items-center ms-5 w-25">
                            <i class="fa-solid fa-eye ms-4"></i>
                            
                            <p class="mt-2 ms-1" id="views">${total_view ? total_view : "No Views"}</p>
                        </div>

                        <div class="d-flex align-items-center justify-content-right w-25 me-2">
                                <i class="fa-regular fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                </div>
                       
                        <div  class="d-flex align-items-center justify-content-end w-10 me-1">
                        
                       
                      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModal('${each._id}')">More</button>
                  
                        </div>
                    </div>
                        </div>
                    </div>
                    </div>
        `
        newsCard.appendChild(div)

        spinner.classList.add("d-none")
    })


}




// ===Modal============
const loadModal = (id) => {

    const url = `https://openapi.programming-hero.com/api/news/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => showModal(data.data))
        .catch(error => console.log(error))

}

const showModal = (moreNews) => {

    for (news of moreNews) {


        const modalBody = document.getElementById("modal-body")

        modalBody.innerHTML =
            ` 
        <div class="card border-0">
         <div class="card-body">
         <h5 class="card-title">${news.title}</h5>
         <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-75 m-3" style="height: 200px;" "alt="...">
         <h6 class="card-title fw-semibold">Views: ${news.total_view ? news.total_view : "No Views"}</h6>
         <h6 class="card-title fw-semibold">Author: ${news.author.name ? news.author.name : "c"}</h6>
         <h6 class="card-title fw-semibold">Date: ${news.author.published_date ? news.author.published_date.slice(0, 10) : "No Date Found"}</h6>
         <p class="card-text">${news.details}</p>
         </div>
        </div>
        `
        modalBody.appendChild(div)
    }
}


loadNewsCategory();
