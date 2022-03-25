var dropzone = document.querySelector('.dropzone');
var filesForUpload = [];

function uploadFiles()
    {
    for (let i = 0; i < filesForUpload.length; i++)
        {
        let file = filesForUpload[i];
        let fileReader = new FileReader();

        fileReader.addEventListener('load', function(e)
            {
            let fileContent = e.target.result;
            importTabs(fileContent);
            });

        fileReader.readAsText(file);
        }
    }

function insertIntoFileList(file)
    {
    for (let i = 0; i < filesForUpload.length; i++)
        {
        if (file.name === filesForUpload[i].name || file.type !== 'application/json')
            {
            // File already exists or is wrong file type
            return;
            }
        }

    filesForUpload.push(file);
    }

function traverseFileTree(item, path)
    {
    path = path || "";
    if (item.isFile)
        {
        // Get file
        item.file(function(file)
            {
            insertIntoFileList(file);
            });
        }
    else if (item.isDirectory)
        {
        // Get folder contents
        let dirReader = item.createReader();
        dirReader.readEntries(function(entries)
            {
            for (var i=0; i<entries.length; i++)
                {
                traverseFileTree(entries[i], path + item.name + "/");
                }
            });
        }
    }

dropzone.ondragover = function()
    {
    this.className = "dropzone dragover";
    return false;
    };

dropzone.ondragleave = function()
    {
    this.className = "dropzone";
    return false;
    };

dropzone.ondrop = function(e)
    {
    // prevent dropped files from opening in browser
    e.preventDefault();
    
    this.className = "dropzone";
    let items = e.dataTransfer.items;
    for (let i = 0; i < items.length; i++)
        {
        let item = items[i].webkitGetAsEntry();
        if (item)
            {
            traverseFileTree(item);
            }
        }

    let files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++)
        {
        insertIntoFileList(files[i]);
        }

    uploadFiles();
    };

dropzone.addEventListener('click', function()
    {
    let element = document.createElement('input');
    element.setAttribute('type', 'file');
	element.multiple = true;
    element.click();

    element.addEventListener('change', function(e)
        {
        let files = this.files;
		for (let i = 0; i < files.length; ++i)
			{
			let fileReader = new FileReader();

			fileReader.addEventListener('load', function(e)
				{
				let fileContent = e.target.result;
				importTabs(fileContent);
				});

			fileReader.readAsText(files[i]);
			}			
        });
    });

