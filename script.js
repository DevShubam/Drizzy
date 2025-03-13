document.addEventListener("DOMContentLoaded", function () {
    fetch("songs.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("song-table");
            data.forEach(song => {
                const row = document.createElement("tr");
                let fileLinks = "";
                
                // Ensure correct key names and clean file paths
                if (Array.isArray(song.file_paths)) {
                    fileLinks = song.file_paths.map(path => `<a href="#" class="file-link">${path.replace(/\n/g, "").trim()}</a>`).join("<br>");
                } else {
                    fileLinks = `<a href="#" class="file-link">${song.file_paths.replace(/\n/g, "").trim()}</a>`;
                }
                
                let formats = Array.isArray(song.formats) ? song.formats.join(" & ") : song.formats;
                
                row.innerHTML = `
                    <td>${song.title}</td>
                    <td>${song.album}</td>
                    <td class="format">${formats}</td>
                    <td>${fileLinks}</td>
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
