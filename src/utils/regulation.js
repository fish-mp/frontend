function enumerateListItems(items, blockNumber = 1) {
    let subNumber = 1;
    items.forEach((item) => {
        let currentNumber = `${blockNumber}.${subNumber}`;
        const numberElement = document.createElement('div');
        numberElement.textContent = `${currentNumber}`;
        numberElement.classList.add('number'); 

        item.insertBefore(numberElement, item.firstChild);
        const childList = item.querySelector('ol, ul');
        if (childList) {
            enumerateListItems(childList.querySelectorAll('.rules__list-item'), blockNumber + 1);
        }
        subNumber++;
    });
}
const topLevelLists = document.querySelectorAll('.rules__list-pr');

topLevelLists.forEach((list, index) => {
    const items = list.querySelectorAll('.rules__list-item');
    enumerateListItems(items, index + 1);
});
