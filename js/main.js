let MenuCards = document.getElementById("MenuCards");
let Recipes = [];
let price = (Math.random() * (2000 - 500) + 250).toFixed(2);

getReciepe('pizza')
async function getReciepe(meal) {
    MenuCards.innerHTML = "<p class='text-center text-muted'>Loading...</p>"; 

    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
        
        if (!res.ok) throw new Error("Response not ok");

        const Data = await res.json();
        Recipes = Data.recipes.slice(0,6);
        DisplayRecipes();
    } catch (error) {
        console.error("Fetch error:", error);
        MenuCards.innerHTML = "<p class='text-danger text-center'>Network error or invalid API. Please try again later.</p>";
    }
}

function DisplayRecipes() {
    let cartona = '';
    for (let i = 0; i < Recipes.length; i++) {
        const recipe = Recipes[i];
        const price = (Math.random() * (1000 - 300) + 250).toFixed(2);

        cartona += `
        <div class="MenuCard col-sm-6 col-md-4 col-lg-3 g-4">
            <div class="card h-100 shadow-sm">
                <img src="${recipe.image_url}" class="card-img-top rounded-top-3" alt="${recipe.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipe.title.split(' ' , 2).join(' ')}</h5>
                    <p class="card-text">Publisher: <strong>${recipe.publisher}</strong></p>
                    <p class="card-text text-success fw-bold">Price: ${price} EGP</p>
                    <a href="${recipe.source_url}"" class="btn color-view m-1 mt-auto">View Recipe</a>
                    <a href="#" onclick='bookmarkRecipe("${recipe.title}", "${recipe.source_url}")' class="btn btn-dark m-1">Bookmark</a>



                </div>
            </div>
        </div>
        `;
    }

    MenuCards.innerHTML = cartona;
}

function bookmarkRecipe(title, url) {
    const recipe = { title, url };

    let bookmarkedRecipes = JSON.parse(localStorage.getItem("bookmarkedRecipes")) || [];

    const alreadyBookmarked = bookmarkedRecipes.some(item => item.url === url);
    if (!alreadyBookmarked) {
        bookmarkedRecipes.push(recipe);
        localStorage.setItem("bookmarkedRecipes", JSON.stringify(bookmarkedRecipes));
    }

    window.location.href = "Bookmark.html";

}





