
const brandImage = document.querySelector('script[brandimage]')?.attributes?.brandimage?.nodeValue
const brandName = document.querySelector('script[brandname]')?.attributes?.brandname?.nodeValue
const showms = document.querySelector('script[showms]')?.attributes?.showms?.nodeValue
const hidems = document.querySelector('script[hidems]')?.attributes?.hidems?.nodeValue
const showfirst = document.querySelector('script[showfirst]')?.attributes?.showfirst?.nodeValue

const renderStyle = () => {
    const style = `@keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }

            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }

            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }

        .container__popup {
            user-select: none;
            -webkit-user-select: none;
            position: fixed;
            right: 10px;
            bottom: 10px;
            padding: 10px;
            border-top: 1px solid rgb(202, 202, 202);
            border-left: 1px solid rgb(202, 202, 202);
            width: 100%;
            max-width: 286px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 1px 2px 2px gray;
            animation: slideInUp 0.5s ease forwards;
        }

        .container__popup.hide {
            animation: slideOutDown 0.5s ease forwards;
        }

        .app__flex {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .container__popup p {
            margin: 0;
        }

        .withdrawal__amount {
            font-size: 18px;
            font-weight: bold;
        }

        .brand__name__title {
            font-weight: bold;
            margin-bottom: 5px !important;
        }

        .mb-5px {
            margin-bottom: 5px !important;
        }

        .gap1 {
            gap: 5px;
    }`

    const docStyle = document.createElement('style')
    docStyle.innerHTML = style
    docStyle.setAttribute('style-name', 'popup-under')
    document.head.appendChild(docStyle)
}

const parentContainer = document.createElement('div')
parentContainer.className = 'container__popup'
const renderPopup = (data) => {
    const maskName = (name) => {
        if (name.length <= 3) return name; // Jika nama kurang dari atau sama dengan 3 huruf, tidak perlu masking
        const firstTwo = name.slice(0, 2); // Ambil 2 huruf pertama
        const lastOne = name.slice(-1);    // Ambil huruf terakhir
        const masked = `${firstTwo}***${lastOne}`; // Gabungkan dengan masking
        return masked;
    };

    const amount = Intl.NumberFormat('id').format(data.amount)
    parentContainer.innerHTML = `<div class="app__flex">
        <div>
            <img src="${brandImage}" width="45" alt="">
        </div>
        <div>
            <div class="app__flex gap1">
                <p class="brand__name__title">${brandName}</p>
                <img src="https://cdn-icons-png.flaticon.com/512/5253/5253963.png" class="mb-5px" width="15" alt="">
            </div>
            <p>${maskName(data.name)} berhasil menarik Rp${amount}</p>
        </div>
    </div>`

    document.body.appendChild(parentContainer)

    setTimeout(() => {
        parentContainer.classList.add("hide");
        setTimeout(() => {
            parentContainer.classList.remove('hide')
            parentContainer.remove()
        }, 500);
    }, hidems);

}

document.addEventListener('DOMContentLoaded', (e) => {
    renderStyle()
    if(showfirst === 'true') {
        const randomData = generateRandomData()
        renderPopup(randomData)
    }
    setInterval(() => {
        const randomData = generateRandomData()
        renderPopup(randomData)
    }, showms)
})

const generateRandomData = () => {
    const name = generateRandomName();
    const amount = generateRandomAmount();
    return { name, amount, probability: getProbability(amount) };
};

const generateRandomName = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz123456789';
    const nameLength = Math.floor(Math.random() * 3) + 6; // Nama panjang antara 3-7 karakter
    let name = '';
    for (let i = 0; i < nameLength; i++) {
        name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return name;
};

const generateRandomAmount = () => {
    const randomPercentage = Math.random() * 100;

    if (randomPercentage <= 40) {
        // 50 ribu - 999 ribu (40%)
        return Math.floor(Math.random() * (999000 - 50000 + 1)) + 50000;
    } else if (randomPercentage <= 80) {
        // 1 juta - 10 juta (40%)
        return Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000;
    } else if (randomPercentage <= 90) {
        // Belasan juta (10%)
        return Math.floor(Math.random() * (15000000 - 11000000 + 1)) + 11000000;
    } else if (randomPercentage <= 99) {
        // Puluhan juta (9%)
        return Math.floor(Math.random() * (90000000 - 20000000 + 1)) + 20000000;
    } else {
        // Ratusan juta (1%)
        return Math.floor(Math.random() * (500000000 - 100000000 + 1)) + 100000000;
    }
};

const getProbability = (amount) => {
    if (amount >= 50000 && amount <= 999000) return 100;
    if (amount >= 1000000 && amount <= 10000000) return 10;
    if (amount >= 11000000 && amount <= 15000000) return 8;
    if (amount >= 20000000 && amount <= 90000000) return 7;
    if (amount >= 100000000) return 1;
};
