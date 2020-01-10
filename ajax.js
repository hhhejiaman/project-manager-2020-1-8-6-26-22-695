function ajaxConnect(options) {
    var optionsInstall = {
        url: options.url || "",
        method: options.method.toLocaleUpperCase() || "GET",
        headers: options.headers || {},
        data: options.data || null,
        success: options.success || function(result) {},
        fail: options.fail || function(error) {}
    }
    var xhr = new XMLHttpRequest();
    xhr.open(optionsInstall.method, optionsInstall.url, true);
    if ((optionsInstall.method === 'POST') || (optionsInstall.method === 'PUT')) {
        xhr.setRequestHeader('content-type', 'application/json');
        optionsInstall.data = JSON.stringify(optionsInstall.data);
    }
    xhr.send(optionsInstall.data);

    xhr.onload = function() {
        optionsInstall.success(JSON.parse(xhr.responseText));
    }

    xhr.onerror = function() {
        optionsInstall.fail(xhr.status);
    }
}