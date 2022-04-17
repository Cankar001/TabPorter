document.addEventListener("DOMContentLoaded", function()
    {
    document.querySelector('.intro').textContent = chrome.i18n.getMessage('introText');
    document.querySelector('.explanation .part-one').textContent = chrome.i18n.getMessage('howTo_one');
    document.querySelector('.explanation .part-two').textContent = chrome.i18n.getMessage('howTo_two');
    document.querySelector('.dropzone p').innerHTML = chrome.i18n.getMessage('dropzone');
    document.querySelector('.exportTabs.exportAllTabs').innerText = chrome.i18n.getMessage('export_all_tabs_btn');
    document.querySelector('.exportTabs.exportSelected').innerText = chrome.i18n.getMessage('export_selected_tabs_btn');
    document.querySelector('.aboutTabPorter').innerText = chrome.i18n.getMessage('about_btn');
    document.querySelector('.sourceCode').innerText = chrome.i18n.getMessage('source_btn');
    });

