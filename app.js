const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', function () {
    nav.classList.toggle('open');
});

// ===============================
// Recipes Data
// ===============================
let recipes = [
    {
        id: 1, name: 'Jollof Rice', category: 'dinner',
        cuisine: 'Nigerian', emoji: '🍚',
        ingredients: ['2 cups rice', 'Tomato paste', 'Onions', 'Seasoning', 'Chicken stock'],
        instructions: 'Fry tomato base, add stock, cook rice in sauce.',
        isFavorite: false
    },
    {
        id: 2, name: 'Avocado Toast', category: 'breakfast',
        cuisine: 'International', emoji: '🥑',
        ingredients: ['2 slices bread', '1 ripe avocado', 'Salt', 'Pepper', 'Lemon'],
        instructions: 'Toast bread. Mash avocado with lemon and salt. Spread.',
        isFavorite: false
    },
    {
        id: 3, name: 'Chicken Pasta', category: 'dinner',
        cuisine: 'Italian', emoji: '🍝',
        ingredients: ['200g pasta', 'Chicken breast', 'Cream', 'Garlic', 'Parmesan'],
        instructions: 'Cook pasta. Fry garlic and chicken, add cream, toss.',
        isFavorite: true
    },
    {
        id: 4, name: 'Mango Smoothie',
        category: 'snack',
        cuisine: 'Tropical', emoji: '🥭',
        ingredients: ['2 mangoes', '1 cup milk', 'Honey', 'Ice cubes'],
        instructions: 'Blend all until smooth.',
        isFavorite: false
    },
    {
        id: 5,
        name: 'Chocolate Cake',
        category: 'dessert',
        cuisine: 'American',
        emoji: '🎂',
        ingredients: ['Flour', 'Cocoa', 'Sugar', 'Eggs', 'Butter', 'Milk', 'Baking powder'],
        instructions: 'Mix ingredients, bake at 180C for 35 minutes.',
        isFavorite: false
    },
    {
        id: 6,
        name: 'Coconut Curry Rice',
        category: 'dinner',
        cuisine: 'Asian',
        emoji: '🍛',
        ingredients: ['Rice', 'Coconut milk', 'Curry powder', 'Onions', 'Garlic', 'Salt'],
        instructions: 'Cook rice with coconut milk and curry base until soft and fragrant.',
        isFavorite: false
    },
    {
        id: 7,
        name: 'Cheesy Chicken Pizza',
        category: 'dinner',
        cuisine: 'Italian',
        emoji: '🍕',
        ingredients: ['Pizza dough', 'Chicken', 'Cheese', 'Tomato sauce', 'Onions', 'Oregano'],
        instructions: 'Spread sauce, add toppings, bake until cheese melts.',
        isFavorite: false
    },
    {
        id: 8,
        name: 'Spicy Noodles Bowl',
        category: 'lunch',
        cuisine: 'Asian',
        emoji: '🍜',
        ingredients: ['Noodles', 'Chili sauce', 'Soy sauce', 'Egg', 'Spring onions', 'Vegetables'],
        instructions: 'Cook noodles, mix with spicy sauce and toppings.',
        isFavorite: false
    },
    {
        id: 9,
        name: 'Fresh Garden Salad',
        category: 'snack',
        cuisine: 'Healthy',
        emoji: '🥗',
        ingredients: ['Lettuce', 'Tomatoes', 'Cucumber', 'Olive oil', 'Lemon juice', 'Salt'],
        instructions: 'Chop vegetables and mix with dressing.',
        isFavorite: false
    },
    {
        id: 10,
        name: 'Honey Glazed Chicken',
        category: 'dinner',
        cuisine: 'American',
        emoji: '🍗',
        ingredients: ['Chicken', 'Honey', 'Soy sauce', 'Garlic', 'Ginger', 'Pepper'],
        instructions: 'Cook chicken until golden, then glaze with honey sauce.',
        isFavorite: false
    },
    {
        id: 11,
        name: 'Vanilla Cupcakes',
        category: 'dessert',
        cuisine: 'American',
        emoji: '🧁',
        ingredients: ['Flour', 'Sugar', 'Eggs', 'Butter', 'Milk', 'Vanilla extract'],
        instructions: 'Mix batter and bake in cupcake tray until fluffy.',
        isFavorite: false
    },
    {
        id: 12,
        name: 'Strawberry Yogurt Parfait',
        category: 'breakfast',
        cuisine: 'Healthy',
        emoji: '🍓',
        ingredients: ['Yogurt', 'Strawberries', 'Granola', 'Honey'],
        instructions: 'Layer yogurt, fruits, and granola in a glass.',
        isFavorite: false
    }
];

const recipeGrid = document.getElementById('recipeGrid');

// ===============================
// Render Recipes
// ===============================
function renderRecipes(list) {

    if (list.length === 0) {
        recipeGrid.innerHTML = `
            <div class='empty-state'>
                <div class='icon'>🍽</div>
                <p>No recipes found. Try adding one!</p>
            </div>
        `;
        return;
    }

    let html = '';

    list.forEach(recipe => {

        const preview = recipe.ingredients.slice(0, 3)
            .map(ing => `<span style="font-size:0.8rem;color:#6B7280">• ${ing}</span>`)
            .join('<br>');

        const heart = recipe.isFavorite ? '❤' : '🤍';
        const favClass = recipe.isFavorite
            ? 'btn-icon btn-favorite active'
            : 'btn-icon btn-favorite';

        html += `
            <div class='card'>
                <div class='card-header'>${recipe.emoji || '🍽'}</div>
                <div class='card-body'>
                    <h3 class='card-title'>${recipe.name}</h3>
                    <span class='card-badge'>${recipe.category}</span>
                    <p class='card-cuisine'>Cuisine: ${recipe.cuisine}</p>
                    <div style='margin-top:8px'>${preview}</div>
                </div>
                <div class='card-actions'>
                    <button class='btn-icon btn-delete' data-id='${recipe.id}'>🗑 Delete</button>
                    <button class='btn-icon btn-shopping' data-id='${recipe.id}'>🛒 Shop</button>
                    <button class='${favClass}' data-id='${recipe.id}'>${heart} Fav</button>
                </div>
            </div>
        `;
    });

    recipeGrid.innerHTML = html;
    attachCardEvents();
}

// ===============================
// Card Events
// ===============================
function attachCardEvents() {

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = Number(this.dataset.id);

            if (!confirm('Delete this recipe?')) return;

            recipes = recipes.filter(r => r.id !== id);
            saveToStorage();
            renderRecipes(recipes);
        });
    });

    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', function () {
            toggleFavorite(Number(this.dataset.id));
        });
    });

    document.querySelectorAll('.btn-shopping').forEach(btn => {
        btn.addEventListener('click', function () {
            openShoppingList(Number(this.dataset.id));
        });
    });
}

// ===============================
// Favorite Toggle
// ===============================
function toggleFavorite(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    recipe.isFavorite = !recipe.isFavorite;
    saveToStorage();
    renderRecipes(recipes);
}

// ===============================
// Storage
// ===============================
function saveToStorage() {
    localStorage.setItem('recipebookData', JSON.stringify(recipes));
}

function loadFromStorage() {
    const stored = localStorage.getItem('recipebookData');
    if (stored) recipes = JSON.parse(stored);
}

// ===============================
// Init (FIXED LOCATION)
// ===============================
function init() {
    loadFromStorage();
    renderRecipes(recipes);
}

init();

// ===============================
// Modal
// ===============================
const modalOverlay = document.getElementById('modalOverlay');
const openFormBtn = document.getElementById('openFormBtn');
const modalClose = document.getElementById('modalClose');
const saveRecipeBtn = document.getElementById('saveRecipeBtn');

openFormBtn.addEventListener('click', () => modalOverlay.classList.add('open'));
modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));

modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('open');
});

// ===============================
// Save Recipe
// ===============================
saveRecipeBtn.addEventListener('click', function () {

    const name = document.getElementById('recipeName').value.trim();
    const category = document.getElementById('recipeCategory').value;
    const cuisine = document.getElementById('recipeCuisine').value.trim();
    const emoji = document.getElementById('recipeEmoji').value.trim() || '🍽';
    const instruct = document.getElementById('recipeInstructions').value.trim();

    const ingredients = document.getElementById('recipeIngredients').value
        .split('\n')
        .map(i => i.trim())
        .filter(Boolean);

    if (!name || ingredients.length === 0) {
        alert('Please enter a name and at least one ingredient.');
        return;
    }

    const newRecipe = {
        id: Date.now(),
        name,
        category,
        cuisine: cuisine || 'Not specified',
        emoji,
        ingredients,
        instructions: instruct,
        isFavorite: false
    };

    recipes.push(newRecipe);
    saveToStorage();
    renderRecipes(recipes);
    modalOverlay.classList.remove('open');
    clearForm();
});

function clearForm() {
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeCuisine').value = '';
    document.getElementById('recipeIngredients').value = '';
    document.getElementById('recipeInstructions').value = '';
    document.getElementById('recipeEmoji').value = '';
}

// ===============================
// Search & Filter (FIXED ORDER)
// ===============================
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function applyFilters() {
    const s = searchInput.value.toLowerCase().trim();
    const c = categoryFilter.value;

    renderRecipes(
        recipes.filter(r =>
            (r.name.toLowerCase().includes(s) ||
             r.cuisine.toLowerCase().includes(s)) &&
            (c === 'all' || r.category === c)
        )
    );
}

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// ===============================
// Shopping List
// ===============================
const shoppingPanel = document.getElementById('shoppingPanel');
const shoppingItems = document.getElementById('shoppingItems');
const closeShoppingPanel = document.getElementById('closeShoppingPanel');

closeShoppingPanel.addEventListener('click', () => {
    shoppingPanel.classList.remove('open');
});

function openShoppingList(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    const itemsHTML = recipe.ingredients
        .map(i => `<div class='shopping-item'>🛒 ${i}</div>`)
        .join('');

    shoppingItems.innerHTML = `
        <p style='font-weight:600;color:#40916C;margin-bottom:16px'>
            ${recipe.emoji} ${recipe.name}
        </p>
        ${itemsHTML}
        <p style='margin-top:16px;color:#6B7280;font-size:0.85rem'>
            ${recipe.ingredients.length} items total
        </p>
    `;

    shoppingPanel.classList.add('open');
}