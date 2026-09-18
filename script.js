let menuData = [];
let currentCategory = 'all';

const fallbackMenu = [
    {
        "category": "الأسماك",
        "nameAr": "سمك بلطي (ردة)",
        "nameEng": "Bolti Fish (Radda)",
        "desc": "سمك بلطي طازج مشوي بالردة على الطريقة السواحلية الأصيلة",
        "price": 150,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    },
    {
        "category": "الأسماك",
        "nameAr": "سمك بلطي (زيت وليمون)",
        "nameEng": "Bolti Fish (Oil & Lemon)",
        "desc": "سمك بلطي طازج بالزيت والليمون والتوابل الخاصة بالفرن",
        "price": 150,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    },
    {
        "category": "الأسماك",
        "nameAr": "سمك بلطي (مقلي)",
        "nameEng": "Fried Bolti Fish",
        "desc": "سمك بلطي طازج مقلي ومقرمش بخلطة ابن حميدو السرية",
        "price": 150,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    },
    {
        "category": "الأسماك",
        "nameAr": "سمك بلطي (صينية أبيض)",
        "nameEng": "Bolti White Tray",
        "desc": "سمك بلطي طازج في صينية بالبصل والصوص الأبيض بالفرن",
        "price": 150,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    },
    {
        "category": "الأسماك",
        "nameAr": "سمك بلطي (صينية أحمر)",
        "nameEng": "Bolti Red Tray",
        "desc": "سمك بلطي طازج في صينية بالصلصة الحمراء والفلفل بالفرن",
        "price": 150,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    },
    {
        "category": "الجمبري",
        "nameAr": "جمبري وسط",
        "nameEng": "Medium Shrimp",
        "desc": "جمبري وسط طازج يجهز بالخلطة أو المقلي أو الطاجن",
        "price": 500,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    },
    {
        "category": "الجمبري",
        "nameAr": "جمبري كبير",
        "nameEng": "Large Shrimp",
        "desc": "جمبري كبير طازج يجهز بالخلطة أو المقلي أو الطاجن",
        "price": 600,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    },
    {
        "category": "الجمبري",
        "nameAr": "جمبري جامبو",
        "nameEng": "Jumbo Shrimp",
        "desc": "جمبري جامبو فاخر طازج يجهز بالخلطة أو المقلي أو الطاجن",
        "price": 750,
        "unit": "ج.م / كيلو",
        "status": "متوفر"
    }
];

async function loadMenu() {
    try {
        const response = await fetch('menu_data.json');
        if (response.ok) {
            menuData = await response.json();
        } else {
            menuData = fallbackMenu;
        }
    } catch (error) {
        console.warn('Using fallback menu data:', error);
        menuData = fallbackMenu;
    }
    buildCategoryTabs();
    renderMenu(currentCategory);
}

function buildCategoryTabs() {
    const navContainer = document.getElementById('categoriesNav');
    if (!navContainer) return;

    navContainer.innerHTML = `
        <button onclick="filterCategory('all')" id="btn-all" class="category-tab active px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-oceanBlue hover:text-white">
            الكل
        </button>
    `;

    const categories = [...new Set(menuData.map(item => item.category))];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        const btnId = `btn-${cat.replace(/\s+/g, '-')}`;
        btn.id = btnId;
        btn.className = "category-tab px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-oceanBlue hover:text-white";
        btn.textContent = cat;
        btn.onclick = () => filterCategory(cat);
        navContainer.appendChild(btn);
    });
}

function renderMenu(categoryToFilter = 'all') {
    const container = document.getElementById('menu-container');
    if (!container) return;
    container.innerHTML = '';

    const filteredItems = categoryToFilter === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === categoryToFilter);

    if (filteredItems.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <p>عذراً، لا توجد أصناف متاحة في هذا القسم حالياً.</p>
            </div>
        `;
        return;
    }

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between group";
        
        card.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <span class="text-xs font-bold text-oceanBlue bg-blue-50 px-3 py-1 rounded-full mb-2 inline-block">${item.category}</span>
                        <h3 class="text-xl font-bold text-gray-900 group-hover:text-oceanBlue transition-colors">${item.nameAr}</h3>
                        <p class="text-xs text-gray-400 italic font-medium">${item.nameEng}</p>
                    </div>
                    <div class="text-left">
                        <span class="text-lg font-black text-accentGold">${item.price} <small class="text-xs text-gray-500">${item.unit || 'ج.م'}</small></span>
                    </div>
                </div>
                <p class="text-gray-600 text-sm mt-3 leading-relaxed whitespace-pre-line">${item.desc}</p>
            </div>
            <div class="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <span class="text-emerald-600 font-semibold flex items-center">
                    ${item.status || 'متوفر'}
                </span>
                <span class="text-gray-400 font-medium">ابن حميدو</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-oceanBlue', 'text-white');
        tab.classList.add('bg-gray-100', 'text-gray-700');
    });

    if (category === 'all') {
        const btnAll = document.getElementById('btn-all');
        if (btnAll) {
            btnAll.classList.remove('bg-gray-100', 'text-gray-700');
            btnAll.classList.add('active');
        }
    } else {
        const btnId = `btn-${category.replace(/\s+/g, '-')}`;
        const activeBtn = document.getElementById(btnId);
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-100', 'text-gray-700');
            activeBtn.classList.add('active');
        }
    }

    renderMenu(category);
}

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
});