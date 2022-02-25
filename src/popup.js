function download(filename, text)
    {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
    }

function chromeTabsToUrlArray(tabs)
    {
    let tabUrls = [];
    for (let i = 0; i < tabs.length; i++)
        {
        tabUrls.push(tabs[i].url);
        }

    return tabUrls;
    }

function tabsToJSON(tabs)
    {
    const data = { "tabs": tabs };
    return JSON.stringify(data);
    }

function tabsFromJSON(json)
    {
    let data = JSON.parse(json);
    return data.tabs;
    }

function exportAllTabs()
    {
    chrome.tabs.getAllInWindow(null, function(tabs)
        {
        let tabUrls = chromeTabsToUrlArray(tabs);
        let json = tabsToJSON(tabUrls);
        download('tabs.json', json);
        });
    }

function exportSelectedTabs()
    {
    chrome.tabs.query({ highlighted: true, currentWindow: true }, function(tabs)
        {
        let tabUrls = chromeTabsToUrlArray(tabs);
        const json = tabsToJSON(tabUrls);
        download('tabs.json', json);
        });
    }

function importTabs(json)
    {
    let tabs = tabsFromJSON(json);
    for (let i = 0; i < tabs.length; i++)
        {
        chrome.tabs.create({ url: tabs[i] });
        }
    }

document.addEventListener("DOMContentLoaded", function()
    {
    document.querySelector('.exportTabs').addEventListener('click', function()
        {
        exportAllTabs();
        });

    document.querySelector('.exportTabs.exportSelected').addEventListener('click', function()
        {
        exportSelectedTabs();
        });

    document.querySelector('.aboutTabPorter').addEventListener('click', function()
        {
        chrome.tabs.create({ url: "https://www.cankarka.com" });
        });
    });

