document.addEventListener("DOMContentLoaded", function () {
    fetch("unofficial.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("song-table");
            data.forEach(song => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${song.title}</td>
                    <td>${song.album}</td>
                    <td class="format">${song.format}</td>
                    <td><a href="#" class="file-link">${song.file_path}</a></td>
                    <td>${song.notes}</td>
                `;
                tableBody.appendChild(row);
            });
        });

    document.getElementById("search").addEventListener("keyup", function () {
        let searchValue = this.value.toLowerCase();
        let rows = document.querySelectorAll("#song-table tr");
        rows.forEach(row => {
            let songTitle = row.cells[0].textContent.toLowerCase();
            let album = row.cells[1].textContent.toLowerCase();
            row.style.display = songTitle.includes(searchValue) || album.includes(searchValue) ? "" : "none";
        });
    });
});
