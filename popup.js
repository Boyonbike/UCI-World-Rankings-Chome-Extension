document.getElementById("btn1").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://dataride.uci.ch/iframe/RankingDetails/148?disciplineId=7&groupId=35&momentId=198378&disciplineSeasonId=453&rankingTypeId=1&categoryId=22&raceTypeId=92" });
});

document.getElementById("btn2").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://dataride.uci.ch/iframe/RankingDetails/155?disciplineId=7&groupId=38&momentId=198380&disciplineSeasonId=453&rankingTypeId=1&categoryId=23&raceTypeId=92" });
});



document.getElementById("btn3").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Step 1: Expand page size AND bind dataBound handler before reading
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: () => {
            const grid = $('.k-grid').data('kendoGrid');


            function applyFilter() {


                const headerRow = document.querySelector(".k-grid thead tr");
                if (headerRow && !headerRow.querySelector(".u23-rank-header")) {
                    const u23Th = document.createElement("th");
                    u23Th.classList.add("u23-rank-header");
                    u23Th.textContent = "U23 Rank";
                    headerRow.appendChild(u23Th);
                }

                const gridTable = document.querySelector(".k-grid tbody");


                const rows = Array.from(gridTable.querySelectorAll("tr.k-master-row"));


                let starRank = 1;
                let u23Rank = 1;

                rows.forEach((row, index) => {
                    const riderLink = row.querySelector("td a");
                    if (!riderLink) return;
                    const name = riderLink.textContent.trim();

                    let starCell = row.querySelector(".star-rank-cell");
                    if (!starCell) {
                        starCell = document.createElement("td");
                        starCell.classList.add("star-rank-cell");
                        row.appendChild(starCell);
                    }

                    let u23Cell = row.querySelector(".u23-rank-cell");
                    if (!u23Cell) {
                        u23Cell = document.createElement("td");
                        u23Cell.classList.add("u23-rank-cell");
                        row.appendChild(u23Cell);
                    }

                    if (name.startsWith("*")) {
                        row.style.display = "";
                        starCell.textContent = starRank++;
                    } else {
                        row.style.display = "none";
                        starCell.textContent = "";
                    }

                });

            }

            // Unbind any previous handler to avoid stacking duplicates on repeated clicks
            grid.unbind("dataBound", grid._btn3Handler);
            grid._btn3Handler = applyFilter;
            grid.bind("dataBound", applyFilter);

            // Now trigger the page size change — dataBound will fire when done
            grid.dataSource.pageSize(99999);
            grid.dataSource.read();
        }
    });
});

document.getElementById("btn4").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",   // ⭐ THIS is the key
        func: () => {
            var grid = $('.k-grid').data('kendoGrid');
            if (grid) {
                grid.dataSource.pageSize(99999);
                grid.dataSource.read();
            }
        }
    });
});