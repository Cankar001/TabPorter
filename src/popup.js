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
  

function exportTabs()
    {
    chrome.tabs.getAllInWindow(null, function(tabs)
        {
        let tabUrls = [];
        for (let i = 0; i < tabs.length; i++)
            {
            tabUrls.push(tabs[i].url);
            }

        const data = {
            "tabs": tabUrls,
            "time": Date.now()
        };

        const json = JSON.stringify(data);
        download('tabs.json', json);
        });
    }

function importTabs(json)
    {
    let data = JSON.parse(json);
    let tabs = data.tabs;

    for (let i = 0; i < tabs.length; i++)
        {
        chrome.tabs.create({ url: tabs[i] });
        }
    }

document.addEventListener("DOMContentLoaded", function(event)
    {
    document.querySelector('.exportTabs').addEventListener('click', function()
        {
        exportTabs();
        });

    document.querySelector('.importTabs').addEventListener('click', function()
        {
            let element = document.createElement('input');
            element.setAttribute('type', 'file');
            element.click();

            element.addEventListener('change', function(e)
                {
                let file = this.files[0];
                let fileReader = new FileReader();

                fileReader.addEventListener('load', function(e)
                    {
                    let fileContent = e.target.result;
                    importTabs(fileContent);
                    });

                fileReader.readAsText(file);
                });
        });

    document.querySelector('.aboutTabPorter').addEventListener('click', function()
        {
        alert("Showing about");
        });
    });

