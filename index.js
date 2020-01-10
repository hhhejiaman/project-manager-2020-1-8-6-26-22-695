var apiUrl = 'http://localhost:3000/projects';
var listBody = document.getElementById('list-body');
var html = "";

function updataList(event) {
    for (i = 0; i < event.length; i++) {
        html += "<tr>";
        html += `<td>${event[i].name}</td>`;
        html += `<td>${event[i].description}</td>`;
        html += `<td>${event[i].endTime}</td>`;
        html += `<td class="item-status">${event[i].status}</td>`;
        html += "<td><div>删除</div></td>";
        html += "</tr>";
    }
    listBody.innerHTML = html;
}

function colorCheck(event) {
    var itemStatus = document.getElementsByClassName("item-status");

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

function getItemData() {
    var getAPIData = {
        url: apiUrl,
        method: 'GET',
        success: function(res) {
            updataList(res);
            colorCheck(res);
        },
        fail: function(error) {
            console.log('error occurred')
        }
    }
    ajaxConnect(getAPIData);
}

getItemData();