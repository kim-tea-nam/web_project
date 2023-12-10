// 검색 처리 함수
function handleSearch() {
    var searchInput = document.getElementById('search');
    var searchQuery = searchInput.value;

    // 검색어가 비어있지 않은 경우에만 결과를 표시
    if (searchQuery.trim() !== "") {
        // Google 검색 페이지로 이동
        window.open("https://www.google.com/search?q=" + encodeURIComponent(searchQuery), "_blank");
    } else {
        alert("검색어를 입력하세요.");
    }

}
function getRandomColor() {
    // 무작위 RGB 색상 생성
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

document.addEventListener('DOMContentLoaded', function() {
    // 초기 데이터
    const siteData = [
        { name: 'Naver', url: 'https://www.naver.com' }, 
        { name: 'Google', url: 'https://www.google.com' },
        // 추가적인 사이트 데이터는 여기에 추가할 수 있습니다.
    ];

    // 필요한 DOM 엘리먼트들을 가져오기
    const siteListContainer = document.getElementById('siteList');
    const usedSiteListContainer = document.getElementById('usedSiteList');
    const addSiteButton = document.getElementById('addSiteButton');
    const addSiteForm = document.getElementById('addSiteForm');
    const newSiteNameInput = document.getElementById('newSiteName');
    const newSiteURLInput = document.getElementById('newSiteURL');
    const submitSiteButton = document.getElementById('submitSite');

    // 이용한 사이트 데이터 배열
    const usedSiteData = [];

     // 사이트 아이템을 생성하는 함수
    function createSiteItem(site) {
        const siteItem = document.createElement('div');
        siteItem.classList.add('site-item');

        const siteName = document.createElement('p');
        siteName.textContent = site.name;

        // 클릭 이벤트 추가
        siteItem.addEventListener('click', function() {
            window.open(site.url, '_blank');
            // 클릭할 때마다 이용한 사이트로 추가
            const visitedSite = {
                name: site.name,
                url: site.url,
                backgroundColor: site.backgroundColor,  // 클릭 시 사용한 사이트에도 배경색 추가
            };
            addVisitedSite(visitedSite);
        });
        
        // 무작위 배경 색이 없을 경우에만 생성
        if (!site.backgroundColor) {
            // 무작위 배경 색 적용
            site.backgroundColor = getRandomColor();
        }
         // 무작위 배경 색 적용
        siteItem.style.backgroundColor = site.backgroundColor;

        siteItem.appendChild(siteName);

        return siteItem;
    }

    // 이용한 사이트 아이템을 생성하는 함수
    function createUsedSiteItem(site) {
        const siteItem = document.createElement('div');
        siteItem.classList.add('site-item');
    
        const siteName = document.createElement('p');
        siteName.textContent = site.name;
    
        siteItem.addEventListener('click', function () {
            window.open(site.url, '_blank');
        });
    
        if (site.backgroundColor) {
            siteItem.style.backgroundColor = site.backgroundColor;
        }

        siteItem.appendChild(siteName);
    
        return siteItem;
    }

    // 사이트 목록을 렌더링하는 함수
    function renderSiteList(container, siteArray) {
        container.innerHTML = '';
        siteArray.forEach(site => {
            const clickHandler = function () {
                window.open(site.url, '_blank');
            };
            const siteItem = createSiteItem(site, clickHandler);
            container.appendChild(siteItem);
        });
    }

    // 이용한 사이트 목록을 렌더링하는 함수
    function renderUsedSiteList(container, siteArray) {
        container.innerHTML = '';
        siteArray.forEach(site => {
            const siteItem = createUsedSiteItem(site);
            container.appendChild(siteItem);
        });
    }

    // 이용한 사이트를 추가하는 함수
    function addVisitedSite(site) {
        const index = usedSiteData.findIndex(visitedSite => visitedSite.url === site.url);

        if (index !== -1) {
            // 이미 목록에 있는 경우 맨 앞으로 이동
            const existingSite = usedSiteData.splice(index, 1)[0];
            usedSiteData.unshift(existingSite);
        } else {
            // 목록에 없는 경우 맨 앞에 추가
            site.backgroundColor = getRandomColor();  // 사용한 사이트에도 배경색 추가
            usedSiteData.unshift(site);
        }
    
        renderUsedSiteList(usedSiteListContainer, usedSiteData);
    }

    // 초기 사이트 목록 및 이용한 사이트 목록 렌더링
    renderSiteList(siteListContainer, siteData);
    renderUsedSiteList(usedSiteListContainer, usedSiteData);

    // '사이트 추가' 버튼 클릭 시 이벤트 처리
    addSiteButton.addEventListener('click', function () {
        addSiteForm.style.display = 'block';
    });

    // '추가' 버튼 클릭 시 이벤트 처리 
    submitSiteButton.addEventListener('click', function () {
        const newName = newSiteNameInput.value;
        const newURL = newSiteURLInput.value;

        if (newName && newURL) {
            const newSite = {
                name: newName,
                url: newURL,
                backgroundColor: getRandomColor(),  // 새로운 사이트에도 배경색 추가
            };
            siteData.push(newSite);
            renderSiteList(siteListContainer, siteData);
            newSiteNameInput.value = '';
            newSiteURLInput.value = '';
            addSiteForm.style.display = 'none';
        } else {
            alert('사이트 이름과 주소를 입력하세요.');
        }
    });
    
    // 검색어 입력창에서 엔터 키 입력 시 이벤트 처리
    function handleEnter(event) {
        if (event.key === 'Enter') {
            handleSearch();
            return false;
        }
        return true;
    }

    const searchInput = document.getElementById('search');  // searchInput 정의 추가

    // 검색어 입력창과 검색 폼 이벤트 처리 
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        handleSearch();
    });

    searchInput.addEventListener('keydown', handleEnter);

    // 전역 클릭 이벤트 처리
    document.addEventListener('click', function (event) {
        const clickedElement = event.target;
    
        if (clickedElement.closest('#usedSiteList')) {
            const siteNameElement = clickedElement.querySelector('p');
    
            if (siteNameElement && siteNameElement.textContent) {
                const visitedSite = {
                    name: siteNameElement.textContent,
                    url: findUrlByName(usedSiteData, siteNameElement.textContent),
                };
                addVisitedSite(visitedSite);
            }
        } else if (clickedElement.tagName === 'A' && clickedElement.href) {
            const visitedSite = {
                name: clickedElement.textContent,
                url: clickedElement.href,
            };
            addVisitedSite(visitedSite);
        }
    });
});




