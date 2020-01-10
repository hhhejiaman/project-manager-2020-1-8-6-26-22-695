var apiUrl = 'http://localhost:3000/projects';
var listBody = document.getElementById('list-body');
var html = "";
console.log(listBody)

function updataList(event) {
    for (i = 0; i < event.length; i++) {
        html += "<tr>";
        html += `<td>${event[i].name}</td>`;
        html += `<td>${event[i].description}</td>`;
        html += `<td>${event[i].endTime}</td>`;
        html += `<td>${event[i].status}</td>`;
        html += "<td><div>删除</div></td>";
        html += "</tr>";
    }
    listBody.innerHTML = html;
}

function getItemData() {
    var getAPIData = {
        url: apiUrl,
        method: 'GET',
        success: function(res) {
            updataList(res);
        },
        fail: function(error) {
            console.log('error occurred')
        }
    }
    ajaxConnect(getAPIData);
}

getItemData();