document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentFrame = document.getElementById('content-frame');

    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found iframe:', contentFrame);

    // Function to load content based on tab name
    const loadContent = (tabName) => {
        let pageName;
        switch(tabName) {
            case 'obd2':
                pageName = 'obd2-gauge';
                break;
            case 'pixly':
                pageName = 'pixly';
                break;
            case 'other':
                pageName = 'other-device';
                break;
            default:
                pageName = 'obd2-gauge';
        }
        const newSrc = `./pages/${pageName}.html`;
        console.log('Loading page:', newSrc);
        contentFrame.src = newSrc;
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('Tab clicked:', button.dataset.tab);
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            loadContent(button.dataset.tab);
        });
    });

    // Load initial content
    loadContent('obd2');
});