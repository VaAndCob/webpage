document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentFrame = document.getElementById('content-frame');

    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found iframe:', contentFrame);

    const validTabs = new Set(
        Array.from(tabButtons).map(btn => btn.dataset.tab).filter(Boolean)
    );

    // Function to load content based on tab name
    const loadContent = (tabName) => {
        let pageName;
        switch(tabName) {
            case 'obd2':
                pageName = 'esp32-bluetooth-obd2-gauge';
                break;
            case 'printpoop':
                pageName = 'printpoop';
                break;
            case 'catalyst':
                pageName = 'OBD2-Gauge-Catalyst';
                break;
            case 'tunebar':
                pageName = 'tunebar';
                break;
            case 'taptappaw':
                pageName = 'taptappaw';
                break;
            default:
                pageName = 'other';
        }
        const newSrc = `./pages/${pageName}.html`;
        console.log('Loading page:', newSrc);
        contentFrame.src = newSrc;
    };

    const setActiveTab = (tabName) => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        const target = Array.from(tabButtons).find(btn => btn.dataset.tab === tabName);
        if (target) {
            target.classList.add('active');
        }
    };

    const getInitialTabFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const candidate = params.get('tab');
        if (candidate && validTabs.has(candidate)) {
            return candidate;
        }
        return 'obd2';
    };

    const updateUrlTabParam = (tabName) => {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tabName);
        window.history.replaceState({}, '', url.toString());
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('Tab clicked:', button.dataset.tab);
            
            const tabName = button.dataset.tab;
            setActiveTab(tabName);
            loadContent(tabName);
            updateUrlTabParam(tabName);
        });
    });

    // Load initial content
    const initialTab = getInitialTabFromUrl();
    setActiveTab(initialTab);
    loadContent(initialTab);
    updateUrlTabParam(initialTab);
});
