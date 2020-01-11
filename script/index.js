var apiUrl = 'http://localhost:3000/projects';
var listBody = document.getElementById('list-body');
var html = "";

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

function updataList(event) {
    for (i = 0; i < event.length; i++) {
        html += "<tr>";
        html += `<td>${event[i].name}</td>`;
        html += `<td class="item-description"><div>${event[i].description}</div></td>`;
        html += `<td>${event[i].endTime}</td>`;
        html += `<td class="item-status">${event[i].status}</td>`;
        html += "<td><div class='delete-btn' onclick='deleteEvent()'>删除</div></td>";
        html += "</tr>";
    }
    listBody.innerHTML = html;
}

var itemStatus = document.getElementsByClassName("item-status");

function colorCheck(event) {
    for (i = 0; i < event.length; i++) {
        switch (itemStatus[i].innerHTML) {
            case 'ACTIVE':
                itemStatus[i].style.color = '#666666';
                break;
            case 'PENDING':
                itemStatus[i].style.color = '#ee706d';
                break;
            case 'CLOSED':
                itemStatus[i].style.color = '#f7da47';
                break;
        }
    }
}

var maskBox = document.getElementById("mask");

function deleteEvent() {
    maskBox.style.display = "block";

}

function cancelBtn() {
    maskBox.style.display = "none";
}

var yesBtn = document.getElementById("yes");
var deleteBtn = document.getElementsByClassName("delete-btn");

function confirmsBtn(event) {
    for (i = 0; i < event.length; i++) {
        var deleteBtnNow = deleteBtn[i];
        deleteBtnNow.addEventListener("click", function(e) {
            var targetBtn = e.target;
            yesBtn.addEventListener("click", function() {
                listBody.removeChild(targetBtn.parentNode.parentNode);
            });
        });
    }
}


function getItemData() {
    var getAPIData = {
        url: apiUrl,
        method: 'GET',
        success: function(res) {
            updataList(res);
            colorCheck(res);
            confirmsBtn(res);
        },
        fail: function(error) {
            console.log('error occurred')
        }
    }
    ajaxConnect(getAPIData);
}

getItemData();